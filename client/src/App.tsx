import {useEffect, useRef, useState} from 'react';
import {Message} from '../types';
import MessageInput from './components/MessageInput';
import MessageContainer from './components/MessageContainer';
import makeStyles from '@mui/styles/makeStyles';
import IncomingMessage from './components/messages/IncomingMessage';
import UserMessage from './components/messages/UserMessage';
import SystemMessage from './components/messages/SystemMessage';
import Lobby from './components/Lobby';
import {configureAbly, useChannel, usePresence} from '@ably-labs/react-hooks';
import {v4 as uuidv4} from 'uuid';
import {AblyContext} from '../context';
import UserList from './components/UserList';

/**TODO:
 * - Show client connection start time (create a user list)
 * - Maybe need to abstract ably server to serverless function to separate client-server ?
 * */

const clientId = uuidv4();

configureAbly({authUrl: '/api/createTokenRequest', clientId});

type ClientInfo = {
  id: string;
  name: string;
};

type ClientPresence = {
  name: string;
  status: string;
};

const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    width: '100vw',
  },
}));

const App = () => {
  const classes = useStyles();
  const [clientInfo, setClientInfo] = useState<ClientInfo>();
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [isInLobby, setIsInLobby] = useState(true);

  const handleReceiveMessage = (message: {data: Message}) => {
    setMessages((messages) => [...messages, message.data]);
  };

  const [channel, ably] = useChannel('main', handleReceiveMessage);
  const [presence, setPresence] = usePresence<ClientPresence>('main', {name: '', status: ''});

  const handleSend = (message: Message) => {
    channel.publish({data: message});
  };

  const handleJoinRoom = (name: string) => {
    const existingName = presence.find((client) => client.data.name === name);

    if (existingName) {
      throw new Error();
    }

    setClientInfo({id: clientId, name});
    setIsInLobby(false);
    setPresence({name, status: 'connected'});
  };

  const renderMessages = () => {
    return [
      ...messages.map((message) => {
        if (!message.name) {
          return <SystemMessage message={message.content} />;
        }

        if (message.id === clientInfo?.id) {
          return <UserMessage message={message.content} />;
        }

        return <IncomingMessage clientName={message.name || ''} message={message.content} />;
      }),
      <div ref={lastMessageRef}></div>,
    ];
  };

  // Initial setup
  useEffect(() => {
    channel.history({limit: 10}, (err, history) => {
      if (history?.items) {
        const originalHistory = history.items.filter((item) => !!item.data.name).slice(0, 5);
        const parsedHistory = originalHistory.reverse();
        const parsedItems = parsedHistory.map((message) => message.data);
        setMessages((prev) => [...prev, ...parsedItems]);
      }
    });

    channel.presence.subscribe('leave', (presence) => {
      const connectedDate = new Date(presence.timestamp);
      const isAfternoon = connectedDate.getHours() >= 12;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: presence.clientId,
          content: `${presence.data.name} has left the room at ${
            !(connectedDate.getHours() % 12) ? 12 : connectedDate.getHours() % 12
          }:${String(connectedDate.getMinutes()).padStart(2, '0')} ${isAfternoon ? 'PM' : 'AM'}.`,
        },
      ]);
    });
  }, []);

  // Presence change on join
  useEffect(() => {
    const clientPresence = presence.find((pres) => pres.clientId === clientId);
    const clientStatus = clientPresence?.data.status;
    const connectedDate = new Date(clientPresence?.timestamp as number);
    const isAfternoon = connectedDate.getHours() >= 12;

    if (clientStatus === 'connected') {
      handleSend({
        id: clientId,
        content: `${clientInfo?.name} has joined the room at ${
          !(connectedDate.getHours() % 12) ? 12 : connectedDate.getHours() % 12
        }:${String(connectedDate.getMinutes()).padStart(2, '0')} ${
          isAfternoon ? 'PM' : 'AM'
        }. Welcome to the chatroom!`,
      });
      setPresence({name: clientInfo?.name as string, status: 'joined'});
      return;
    }
  }, [presence]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <AblyContext.Provider value={ably}>
      <div className={classes.app}>
        <UserList presences={presence} />
        <Lobby visible={isInLobby} handleJoinRoom={handleJoinRoom} />
        <MessageContainer renderMessages={renderMessages} />
        <MessageInput clientName={clientInfo?.name as string} handleSend={handleSend} />
      </div>
    </AblyContext.Provider>
  );
};

export default App;

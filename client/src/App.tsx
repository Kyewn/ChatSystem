import {useCallback, useState} from 'react';
import {Message} from '../../types';
import MessageInput from './components/MessageInput';
import MessageContainer from './components/MessageContainer';
import makeStyles from '@mui/styles/makeStyles';
import {io} from 'socket.io-client';
import IncomingMessage from './components/messages/IncomingMessage';
import UserMessage from './components/messages/UserMessage';
import {SocketContext} from '../context';
import SystemMessage from './components/messages/SystemMessage';

//FIXME: Not valid IP when host on cloud
const socket = io('http://oowucomputer.com:3535');

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
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (message: Message) => {
    setMessages((messages) => [...messages, message]);
    socket.emit('send', message);
  };

  const handleJoin = (id: string, messageCache: Message[]) => {
    const systemMessage = {content: `Client ${id} ${socket.id === id ? '(You)' : ''} has joined the room.`};
    if (socket.id === id) {
      setMessages([...messageCache, systemMessage]);
    } else {
      setMessages((messages) => [...messages, systemMessage]);
    }
  };

  const handleReceiveMessage = (message: Message) => {
    setMessages((messages) => [...messages, message]);
  };

  // socket.off removes listener before .on adds the listener back
  // Prevent adding multiple listeners which result in multiple callbacks
  socket.off('join').on('join', handleJoin);

  socket.off('receiveMessage').on('receiveMessage', handleReceiveMessage);

  const renderMessages = () =>
    messages.map((message) => {
      if (message.id === socket.id) {
        return <UserMessage message={message.content} />;
      }

      if (!message.id) {
        return <SystemMessage message={message.content} />;
      }

      return <IncomingMessage clientName={message.id} message={message.content} />;
    });

  return (
    <SocketContext.Provider value={socket}>
      <div className={classes.app}>
        <MessageContainer renderMessages={renderMessages} />
        <MessageInput handleSend={handleSend} />
      </div>
    </SocketContext.Provider>
  );
};

export default App;

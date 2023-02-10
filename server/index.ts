import {Server} from 'socket.io';
import {Message} from '../types';

const socketServer = new Server(3535, {
  cors: {
    // FIXME: Dummy URL that cannot be used for cloud hosting
    origin: 'http://oowucomputer.com:23733',
  },
});

const messageCache: Message[] = [];
const maxMessageCache = 5;

socketServer.on('connection', (socket) => {
  socket.on('setName', (name: string) => {
    socketServer.emit('join', {id: socket.id, name, messageCache});
  });

  socket.on('send', (message: Message) => {
    if (messageCache.length === maxMessageCache) {
      messageCache.shift();
    }
    messageCache.push(message);

    socket.broadcast.emit('receiveMessage', message);
  });
});

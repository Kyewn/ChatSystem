import {Server} from 'socket.io';
import {Message} from './types';

const PORT = Number.parseInt(process.env.PORT as string) || 3535;

const socketServer = new Server(PORT, {
  cors: {
    // FIXME: Dummy URL that cannot be used for cloud hosting
    origin: `https://chat-system-k87lz9vgd-oowu.vercel.app/`,
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

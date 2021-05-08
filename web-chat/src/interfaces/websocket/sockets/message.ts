import { Socket, Server } from 'socket.io';
import { SocketContext, ISocket } from '../../../types/interface';

export class MessageSocket implements ISocket {
  private socket: Socket;
  private io: Server;

  constructor({ socket, io }: SocketContext) {
    this.socket = socket;
    this.io = io;
  }

  listener() {
    let users = [] as {
      id: string,
      username: string,
      room: string,
    }[];

    function formatMessage(username, text) {
      return {
        username,
        text,
        time: '25-25-25',
      }
    }

    this.socket.on('joinRoom', ({ username, room }) => {
      const user = { id: this.socket.id, username, room };
      users.push(user);
      this.socket.join(user.room);
      //Welcome current user
      this.socket.emit('message', formatMessage('ChatCordBot', 'Welcome to ChatCord'));
      // Boradcast when a user connect
      this.socket.broadcast
          .to(user.room)
          .emit('message', formatMessage('ChatCordBot',`A ${user.username} has joined the chat`)); // manda para todoas menos para o usuario
      // io.emit() manda para todos, inclusive o usuario ativo
      //sned users and room info
      this.io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: users.filter(user => user.room === room),
      })
    });

    // listen for chatMessage
    this.socket.on('chatMessage', (msg) => {
      const user = users.find(user => user.id === this.socket.id);
      this.io.to(user!.room).emit('message', formatMessage(user!.username, msg));
    });

    // Quando o cliente desconecta
    this.socket.on('disconnect', () => {
      const user =  users.find(user => user.id === this.socket.id);

      if (user) {
        this.io.to(user.room).emit('message', formatMessage('ChatCordBot',`${user.username} has left the chat`));
                //sned users and room info
        this.io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: users.filter(user => user.room === user.room),
        })
      }
    });
  }
}

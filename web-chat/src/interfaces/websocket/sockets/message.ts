import { Socket, Server } from 'socket.io';
import { SocketContext, ISocket } from '../../../types/interface';

const users = [] as {
  id: string,
  username: string,
  roomId: string,
}[];

function formatMessage(username, text) {
  return {
    username,
    text,
    time: '25-25-25',
  }
}
export class MessageSocket implements ISocket {
  private socket: SocketContext['socket'];
  private io: SocketContext['io'];

  private messageService: SocketContext['container']['messageService'];

  constructor({ socket, io, container }: SocketContext) {
    this.socket = socket;
    this.io = io;

    this.messageService = container.messageService;
  }

  listener() {
    this.socket.on('joinRoom', this.joinRoom.bind(this));
    this.socket.on('chatMessage', this.createMessage.bind(this));
    this.socket.on('disconnect', () => {
      const user =  users.find(user => user.id === this.socket.id);

      if (user) {
        this.io.to(user.roomId).emit('message', formatMessage('ChatCordBot',`${user.username} has left the chat`));
                //sned users and room info
        this.io.to(user.roomId).emit('roomUsers', {
            room: user.roomId,
            users: users.filter(user => user.roomId === user.roomId),
        })
      }
    });
  }

  async joinRoom({ username, roomId }) {
    const user = { id: this.socket.id, username, roomId };
    users.push(user);
    this.socket.join(user.roomId);

    const messages = await this.messageService.getMessagesByRoomId(roomId);

    this.socket.emit('messages-join-room', messages);
  }

  async createMessage({
    message,
    userId,
    roomId,
  }) {
    const user = users.find(user => user.id === this.socket.id);
    console.log({
      message,
      userId,
      roomId,
    })
    await this.messageService.createMessage({
      message,
      userId,
      roomId,
    });

    this.io.to(user!.roomId).emit('message', formatMessage(user!.username, message));
  }
}

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
  private roomService: SocketContext['container']['roomService'];

  constructor({ socket, io, container }: SocketContext) {
    this.socket = socket;
    this.io = io;

    this.messageService = container.messageService;
    this.roomService = container.roomService;
  }

  listener() {
    this.socket.on('joinRoom', this.joinRoom.bind(this));
    this.socket.on('chatMessage', this.createMessage.bind(this));
  }

  async joinRoom({ roomId }) {
    const username = this.socket.username;

    if (username !== 'BOT') {
      this.socket.join(roomId);

      const messages = await this.messageService.getMessagesByRoomId(roomId);

      this.socket.emit('messages-join-room', messages);
    } else {
      const rooms = await this.roomService.findAll();
      rooms.forEach((room) => this.socket.join(room.id))
    }
  }

  async createMessage({
    message,
    roomId,
  }) {
    await this.messageService.createMessage({
      message,
      userId: this.socket.userId!,
      roomId,
    });

    this.io.to(roomId).emit('message', {
      username: this.socket.username!,
      message,
    });
  }
}

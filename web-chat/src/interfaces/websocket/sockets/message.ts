import { SocketContext, ISocket } from '../../../types/interface';


export class MessageSocket implements ISocket {
  private socket: SocketContext['socket'];
  private io: SocketContext['io'];

  private messageService: SocketContext['container']['messageService'];
  private roomService: SocketContext['container']['roomService'];
  private userService: SocketContext['container']['userService'];
  private botName: SocketContext['botName'];

  constructor({ socket, io, container, botName }: SocketContext) {
    this.socket = socket;
    this.io = io;

    this.messageService = container.messageService;
    this.roomService = container.roomService;
    this.userService = container.userService;

    this.botName = botName;
  }

  listener() {
    this.socket.on('joinRoom', this.joinRoom.bind(this));
    this.socket.on('chatMessage', this.createMessage.bind(this));
  }

  async joinRoom({ roomId }) {
    const username = this.socket.username;

    if (username !== this.botName) {
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
    const newMessage = await this.messageService.createMessage({
      message,
      userId: this.socket.userId!,
      roomId,
    });

    this.io.to(roomId).emit('message', {
      username: this.socket.username!,
      message,
      roomId,
      createdAt: newMessage.createdAt,
    });
  }

  async redisSubscription(_, data) {
    const {
      message,
      roomId
    } = JSON.parse(data);
    const user = await this.userService.findByUsername(this.botName);

    const newMessage = await this.messageService.createMessage({
      message,
      userId: user.id!,
      roomId,
    });

    this.io.to(roomId).emit('message', {
      username: user.username,
      message,
      roomId,
      createdAt: newMessage.createdAt,
    });
  }
}

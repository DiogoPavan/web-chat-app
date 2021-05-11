import { SocketContext, ISocket } from '../../../types/interface';
import { Message } from '../../../types/message';

export class ChatSocket implements ISocket {
  private socket: SocketContext['socket'];
  private io: SocketContext['io'];

  private messageService: SocketContext['container']['messageService'];
  private roomService: SocketContext['container']['roomService'];
  private userService: SocketContext['container']['userService'];
  private botName: SocketContext['botName'];

  constructor({
    socket,
    io,
    container,
    botName,
  }: SocketContext) {
    this.socket = socket;
    this.io = io;

    this.messageService = container.messageService;
    this.roomService = container.roomService;
    this.userService = container.userService;

    this.botName = botName;
  }

  listener(): void {
    this.socket.on('join-room', this.joinRoom.bind(this));
    this.socket.on('chat-message', this.createMessage.bind(this));
  }

  async joinRoom({ roomId }: {
    roomId: Message['roomId']
  }): Promise<void> {
    const { username } = this.socket;

    if (username !== this.botName) {
      this.socket.join(roomId);

      const messages = await this.messageService.findByRoomId(roomId);

      this.socket.emit('messages-join-room', messages);
    } else {
      const rooms = await this.roomService.findAll();
      rooms.forEach((room) => this.socket.join(room.id));
    }
  }

  async createMessage({
    message,
    roomId,
  }: {
    message: Message['message']
    roomId: Message['roomId']
  }): Promise<void> {
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

  async redisSubscription(_, data): Promise<void> {
    const {
      message,
      roomId,
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

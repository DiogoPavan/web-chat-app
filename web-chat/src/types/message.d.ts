export type Message = {
  userId: string,
  roomId: string,
  message: string,
  createdAt?: string,
};

export interface IMessageRepository {
  createMessage(message: Message): Promise<Message>;
  getMessagesByRoomId(roomId: Message['roomId']): Promise<Message[]>;
}

export interface IMessageService {
  createMessage(message: Message): Promise<Message>;
  getMessagesByRoomId(roomId: Message['roomId']): Promise<Message[]>;
}

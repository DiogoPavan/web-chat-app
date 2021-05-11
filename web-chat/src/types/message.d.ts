export type Message = {
  id?: string,
  userId: string,
  roomId: string,
  message: string,
  createdAt?: string,
};

export interface IMessageRepository {
  createMessage(message: Message): Promise<Message>;
  findByRoomId(roomId: Message['roomId']): Promise<Message[]>;
}

export interface IMessageService {
  createMessage(message: Message): Promise<Message>;
  findByRoomId(roomId: Message['roomId']): Promise<Message[]>;
}

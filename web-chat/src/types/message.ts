export type Message = {
  userId: string,
  roomId: string,
  message: string,
  date?: string,
};

export interface IMessageRepository {
  createMessage(message: Message): Promise<Message>;
}

export interface IMessageService {
  createMessage(message: Message): Promise<Message>;
}

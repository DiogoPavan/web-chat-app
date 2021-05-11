import { Message, IMessageService } from '../types/message';
import { ServiceContext } from '../types/service';

export class MessageService implements IMessageService {
  private messageRepository: ServiceContext['messageRepository'];

  constructor({ messageRepository }: ServiceContext) {
    this.messageRepository = messageRepository;
  }

  private getCreatedAt() {
    const date = new Date().toISOString();
    return `${date.substr(0, 10)} ${date.substr(11, 8)}`;
  }

  async createMessage(message: Message): Promise<Message> {
    const STOCK_PATTERN = /\/stock=([^\s]*)/;

    let createdAt = this.getCreatedAt();

    if (!message.message.match(STOCK_PATTERN)) {
      const insertedMessage = await this.messageRepository.createMessage(message);

      createdAt = insertedMessage.createdAt!;
    }

    return {
      ...message,
      createdAt,
    };
  }

  async findByRoomId(roomId: string): Promise<Message[]> {
    const messages = await this.messageRepository.findByRoomId(roomId);
    return messages.reverse();
  }
}

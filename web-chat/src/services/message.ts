import { Message, IMessageService } from '../types/message';
import { ServiceContext } from '../types/service';

export class MessageService implements IMessageService {
  private messageRepository: ServiceContext['messageRepository'];

  constructor({ messageRepository }: ServiceContext) {
    this.messageRepository = messageRepository
  }

  async createMessage(message: Message): Promise<Message> {
    return this.messageRepository.createMessage(message);
  }
}
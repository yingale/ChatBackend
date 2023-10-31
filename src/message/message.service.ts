import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm'; // Import Connection
import { Group } from 'src/group/entities/group.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(
    senderId: number,
    receiverId: number,
    content: string,
    groupId: number,
  ): Promise<Message> {
    const message = new Message();
    const sender = new User();
    sender.id = senderId; // Assign the user's ID
    const receiver = new User();
    receiver.id = receiverId; // Assign the receiver's ID
    const group = new Group();
    group.id = groupId;
    message.sender = sender;
    message.receiver = receiver;
    message.content = content;
    message.is_group_message = false;
    if (groupId != null && groupId > 0) {
      message.is_group_message = true;
      message.groupId = groupId;
    }
    return this.messageRepository.save(message);
  }

  async findMessagesForChat(
    senderId: number,
    receiverId: number,
  ): Promise<Message[]> {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .innerJoin('message.sender', 'sender') // Assuming 'receiver' is the relation in the Message entity to User
      .where(
        '((message.sender_id = :senderId AND message.receiver_id = :receiverId) OR ' +
          '(message.sender_id = :receiverId AND message.receiver_id = :senderId))',
        { senderId, receiverId },
      )
      .select(['message.content', 'sender.username', 'message.timestamp'])
      .getMany();
    const output = [];
    messages.forEach((element) => {
      console.log(element);
      const message = {
        type: 'primary',
        user: element.sender.username,
        text: element.content,
        time: element.timestamp,
      };
      output.push(message);
    });
    console.log(output);

    return output;
  }

  async findMessagesForGroup(groupId: number): Promise<Message[]> {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .innerJoin('message.sender', 'sender') // Assuming 'sender' is the relation in the Message entity to User
      .where('message.groupId = :groupId', { groupId }) // Remove the extra parentheses
      .select(['message.content', 'sender.username', 'message.timestamp'])
      .getMany();
    const output = [];
    messages.forEach((element) => {
      console.log(element);
      const message = {
        type: 'primary',
        user: element.sender.username,
        text: element.content,
        time: element.timestamp,
      };
      output.push(message);
    });

    return output;
  }
  async findMessagesByChatId(id: number): Promise<Message> {
    console.log(id);
    return this.messageRepository.findOneBy({ id });
  }
}

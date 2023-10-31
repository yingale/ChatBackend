// src/messages/message.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  async createMessage(@Body() messageData: CreateMessageDto) {
    const { senderId, receiverId, content, groupId } = messageData;
    return this.messageService.createMessage(
      senderId,
      receiverId,
      content,
      groupId,
    );
  }

  @Get('chatByUser/:senderId/:receiverId')
  async getMessagesForChat(
    @Param('senderId') senderId: number,
    @Param('receiverId') receiverId: number,
  ) {
    return this.messageService.findMessagesForChat(senderId, receiverId);
  }

  @Get('chatByGroup/:groupId')
  async getMessagesForGroup(@Param('groupId') groupId: number) {
    return this.messageService.findMessagesForGroup(groupId);
  }

  @Get('chatById/:id')
  findOne(@Param('id') id: string) {
    return this.messageService.findMessagesByChatId(+id);
  }
}

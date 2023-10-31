// src/messages/create-message.dto.ts
export class CreateMessageDto {
  senderId: number;
  receiverId: number;
  content: string;
  groupId: number;
}

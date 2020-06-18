export type MessageType = 'success' | 'info' | 'error' | 'warning';

export class MessageModel {
  message: string;
  type: MessageType;
  
  constructor(message, type: MessageType) {
    this.message = message;
    this.type = type;
  }
}

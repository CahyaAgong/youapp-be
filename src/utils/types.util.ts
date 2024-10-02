import { Message } from 'src/schema/message.schema';
import { Profile } from 'src/schema/profile.schema';

export interface ExtendedProfile extends Profile {
  zodiac?: string;
  horoscope?: string;
}

export interface MessageType {
  senderId: string;
  receiverId: string;
}

export interface ResponseMessageType extends MessageType {
  text: string;
}

export interface MessageListType {
  partner: { id: string; username: string };
  messages: Message[];
}

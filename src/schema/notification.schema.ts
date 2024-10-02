import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  receiverId: string;

  @Prop({ required: true })
  messageId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Boolean, default: false })
  isRead: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

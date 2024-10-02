import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message } from './message.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  sentMessages: Message[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  receivedMessages: Message[];
}

export const UserSchema = SchemaFactory.createForClass(User);

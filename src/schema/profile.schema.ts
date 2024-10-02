import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  birthday: string;

  @Prop({ default: 0 })
  height: number;

  @Prop({ default: 0 })
  weight: number;

  @Prop({ type: [String], default: [] })
  interest: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

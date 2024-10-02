import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@mongodb:27017/youapp-db?retryWrites=true&writeConcern=majority&authSource=admin',
    ),
    AuthModule,
    ProfileModule,
    ChatModule,
  ],
  providers: [],
})
export class AppModule {}

import { Token, TokenSchema } from './../user/schemas/token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
})
export class TokenModule {}

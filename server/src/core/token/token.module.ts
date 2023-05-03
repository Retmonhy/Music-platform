import { Token, TokenSchema } from './schemas/token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from './token.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [TokenService],
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
})
export class TokenModule {}

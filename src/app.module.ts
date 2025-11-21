import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AddressModule } from './address/address.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AddressModule],
})
export class AppModule {}

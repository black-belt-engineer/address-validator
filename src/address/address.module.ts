import { Module } from '@nestjs/common';

import { AddressController } from './address.controller';
import { AddressService } from './services/address.service';
import { SmartyClient } from './services/smarty.client';
import { AddressVerificationService } from './services/address-verification.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, SmartyClient, AddressVerificationService],
})
export class AddressModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from './services/address.service';
import { ValidateAddressDto } from './dto/ validate-address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post('validate')
  async validate(@Body() dto: ValidateAddressDto) {
    return this.service.validate(dto.address);
  }
}

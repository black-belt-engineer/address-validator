import { AddressStatus, ParsedAddress } from '../types/address.type';

export class ValidateAddressResponseDto {
  status: AddressStatus;
  parsedAddress?: ParsedAddress;
  reason?: string;
}

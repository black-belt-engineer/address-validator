import { Injectable } from '@nestjs/common';
import { AddressVerificationService } from './address-verification.service';
import { ValidateAddressResponseDto } from '../dto/validate-address-response.dto';

@Injectable()
export class AddressService {
  constructor(private readonly verifier: AddressVerificationService) {}

  async validate(address: string): Promise<ValidateAddressResponseDto> {
    const result = await this.verifier.verify(address);

    if (!result.ok || !result.standardized) {
      return {
        status: 'UNVERIFIED',
        reason: result.reason,
      };
    }

    return {
      status: result.isExactMatch ? 'VALID' : 'CORRECTED',
      parsedAddress: result.standardized,
    };
  }
}

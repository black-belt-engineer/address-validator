import { Injectable } from '@nestjs/common';
import { ParsedAddress, VerificationResult } from '../types/address.type';
import { SmartyClient } from './smarty.client';

@Injectable()
export class AddressVerificationService {
  constructor(private readonly smarty: SmartyClient) {}

  async verify(rawAddress: string): Promise<VerificationResult> {
    const results = await this.smarty.verifyRaw(rawAddress);

    if (!results || results.length === 0) {
      return { ok: false, reason: 'Address not found' };
    }

    const standardized = this.mapSmartyToParsed(results[0]);
    const isExactMatch = results[0].analysis?.dpv_match_code === 'Y';

    return { ok: true, standardized, isExactMatch };
  }

  private mapSmartyToParsed(r: any): ParsedAddress {
    return {
      houseNumber: r.components.primary_number,
      street:
        `${r.components.street_name} ${r.components.street_suffix}`.trim(),
      city: r.components.city_name,
      state: r.components.state_abbreviation,
      zipCode: r.components.zipcode,
    };
  }
}

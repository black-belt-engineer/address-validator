import axios from 'axios';
import { SmartyLookupResult } from '../types/smarty.type';
import { ConfigService } from '@nestjs/config';
import { ParsedAddress } from '../types/address.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmartyClient {
  private readonly authId: string;
  private readonly authToken: string;
  private readonly url =
    'https://us-street.api.smartystreets.com/street-address';

  constructor(private readonly configService: ConfigService) {
    this.authId = this.configService.get<string>('SMARTY_AUTH_ID') || '';
    this.authToken = this.configService.get<string>('SMARTY_AUTH_TOKEN') || '';
  }

  async verifyRaw(rawAddress: string): Promise<SmartyLookupResult[]> {
    try {
      const response = await axios.get<SmartyLookupResult[]>(this.url, {
        params: {
          'auth-id': this.authId,
          'auth-token': this.authToken,
          street: rawAddress,
        },
      });

      return response.data;
    } catch (err) {
      console.error('Smarty API error', err);
      return [];
    }
  }

  mapToParsed(result: SmartyLookupResult): ParsedAddress {
    return {
      houseNumber: result.components.primary_number,
      street:
        `${result.components.street_name} ${result.components.street_suffix}`.trim(),
      city: result.components.city_name,
      state: result.components.state_abbreviation,
      zipCode: result.components.zipcode,
    };
  }
}

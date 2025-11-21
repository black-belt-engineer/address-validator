export type AddressStatus = 'VALID' | 'CORRECTED' | 'UNVERIFIED';

export interface ParsedAddress {
  houseNumber?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface VerificationResult {
  ok: boolean;
  standardized?: ParsedAddress;
  reason?: string;
  isExactMatch?: boolean;
}

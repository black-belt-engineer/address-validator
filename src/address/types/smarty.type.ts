export interface SmartyComponents {
  primary_number: string;
  street_name: string;
  street_suffix: string;
  city_name: string;
  state_abbreviation: string;
  zipcode: string;
}

export interface SmartyAnalysis {
  dpv_match_code?: string;
}

export interface SmartyLookupResult {
  components: SmartyComponents;
  analysis?: SmartyAnalysis;
}

export interface CountryInfo {
  altSpellings: string[];
  area: number;
  capital?: string[];
  capitalInfo: { latlng: number[] };
  car: { signs: string[]; side: 'left' | 'right' };
  cca2: string;
  continents: string[];
  currencies: Record<string, { name: string; symbol: string }>;
  demonyms: { eng: { f: string; m: string } };
  flags: { png: string; svg: string };
  idd: { root: string; suffixes: string[] };
  independent: boolean;
  landlocked: boolean;
  languages: Record<string, string>;
  latlng: number[];
  maps: { googleMaps: string; openStreetMaps: string };
  name: { common: string; official: string; nativeName: { eng: string } };
  population: number;
  region: string;
  startOfWeek: 'monday' | 'sunday';
  status: 'officially-assigned' | 'unofficially-assigned';
  timezones: string[];
  tld: string[];
}

export interface TResponse<T> {
  data?: T;
  error?: { message: string; name: string; status: number };
}

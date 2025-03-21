import fetcher from './fetcher';
import type { CountryInfo } from './types';

const apiRequest = {
  all: async () => fetcher.get<CountryInfo[]>('all'),
};

export default apiRequest;

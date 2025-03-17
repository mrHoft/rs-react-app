import type { CountryInfo } from '~/api/types';

export function CountryRow({ country }: { country: CountryInfo }) {
  return (
    <tr>
      <td>{country.name.common}</td>
      <td>{country.capital.join(', ')}</td>
      <td>{country.population}</td>
      <td>{country.region}</td>
    </tr>
  );
}

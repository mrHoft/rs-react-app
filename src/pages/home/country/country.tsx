import React from 'react';

import type { CountryInfo } from '~/api/types';

function CountryRow({ country }: { country: CountryInfo }) {
  return (
    <tr>
      <td>
        <img height={24} src={country.flags.svg} alt={country.cca2} />
      </td>
      <td>{country.name.official}</td>
      <td>{country.capital ? country.capital.join(', ') : '—'}</td>
      <td>{country.population}</td>
      <td>{country.region}</td>
    </tr>
  );
}

export const MemoizedCountryRow = React.memo(
  CountryRow,
  (prev, cur) => prev.country.name.official === cur.country.name.official
);

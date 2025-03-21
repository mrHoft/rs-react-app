import React from 'react';
import type { CountryInfo } from '~/api/types';
import { Modal } from '~/ui/modal/modal';
import { CountryCard } from './card';

import styles from './row.module.css';

function CountryRow({ country }: { country: CountryInfo }) {
  const handleClick = () => {
    Modal.show(<CountryCard country={country} />);
  };

  return (
    <tr className={styles.table__row} onClick={handleClick}>
      <td className={styles.table__flag}>
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

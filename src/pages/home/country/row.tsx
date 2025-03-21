import React from 'react';
import type { CountryInfo } from '~/api/types';
import { Modal } from '~/ui/modal/modal';
import Storage from '~/utils/storage';
import { MemoizedCountryCard } from './card';

import styles from './row.module.css';

const storage = new Storage();

function CountryRow({ country }: { country: CountryInfo }) {
  const [visited, setVisited] = React.useState(() => storage.get<boolean>(country.cca2));

  const handleClick = React.useCallback(() => {
    if (!visited) {
      setVisited(true);
      storage.set(country.cca2, true);
    }
    Modal.show(<MemoizedCountryCard country={country} />);
  }, [visited, country]);

  return (
    <tr className={visited ? styles.table__row_visited : styles.table__row} onClick={handleClick}>
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

export const MemoizedCountryRow = React.memo(CountryRow, (prev, cur) => prev.country.cca2 === cur.country.cca2);

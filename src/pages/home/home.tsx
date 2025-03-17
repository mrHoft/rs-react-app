import { useEffect, useState } from 'react';
import type { CountryInfo } from '~/api/types';
import { Search } from '~/ui/search/search';
import Select from '~/ui/select/select';
import { CountryRow } from './country/country';

import styles from './home.module.css';

function getCountryData() {
  return fetch('/countries.json')
    .then(response => response.json())
    .then(data => data as CountryInfo[]);
}

export function PageHome() {
  const [countries, setCountries] = useState<CountryInfo[]>([]);

  useEffect(() => {
    getCountryData().then(setCountries);
  }, []);

  return (
    <>
      <h1 className={styles.header}>Countries</h1>
      <div className={styles.filters}>
        <Search placeholder="Search by country" />
        <Select
          name="region"
          placeholder="Filter by region"
          options={['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']}
        />
      </div>
      <table className={styles.table}>
        <thead className={styles.table__header}>
          <tr>
            <th>Country</th>
            <th>Capital</th>
            <th>Population</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {countries.slice(0, 10).map((country, i) => (
            <CountryRow key={i} country={country} />
          ))}
        </tbody>
      </table>
    </>
  );
}

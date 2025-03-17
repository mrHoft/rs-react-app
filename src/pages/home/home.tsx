import { useEffect, useState } from 'react';
import type { CountryInfo } from '~/api/types';
import { Search } from '~/ui/search/search';
import Select from '~/ui/select/select';
import { CountryRow } from './country/country';

import styles from './home.module.css';

type TSortingField = 'name' | 'population' | 'region' | 'capital' | null;

function getCountryData() {
  return fetch('/countries.json')
    .then(response => response.json())
    .then(data => data as CountryInfo[]);
}

export function PageHome() {
  const [countries, setCountries] = useState<CountryInfo[]>([]);
  const [sorting, setSorting] = useState<{ field: TSortingField; order: number }>({ field: 'name', order: 1 });

  const countriesSorted = countries.sort((a, b) => {
    switch (sorting.field) {
      case 'name':
        return a.name.common > b.name.common ? sorting.order : -sorting.order;
      case 'population':
        return a.population > b.population ? sorting.order : -sorting.order;
      case 'region':
        return a.region > b.region ? sorting.order : -sorting.order;
      case 'capital':
        if (!a.capital || !b.capital) return 0;
        return a.capital[0] > b.capital[0] ? sorting.order : -sorting.order;
      default:
        return 0;
    }
  });

  useEffect(() => {
    getCountryData().then(setCountries);
  }, []);

  const getDirection = (field: string) => {
    if (sorting.field === field) {
      return <span className={styles.order}>{sorting.order === -1 ? '▲' : '▼'}</span>;
    }
    return null;
  };

  const handleSwitchSorting = (field: TSortingField) => () =>
    setSorting(prev => ({ field, order: field === prev.field ? prev.order * -1 : prev.order }));

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
            <th onClick={handleSwitchSorting('name')}>Country {getDirection('name')}</th>
            <th onClick={handleSwitchSorting('capital')}>Capital {getDirection('capital')}</th>
            <th onClick={handleSwitchSorting('population')}>Population {getDirection('population')}</th>
            <th onClick={handleSwitchSorting('region')}>Region {getDirection('region')}</th>
          </tr>
        </thead>
        <tbody>
          {countriesSorted.map((country, i) => (
            <CountryRow key={i} country={country} />
          ))}
        </tbody>
      </table>
    </>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import apiRequest from '~/api/request';
import type { CountryInfo } from '~/api/types';
import { Loader } from '~/ui/loader/loader';
import { Search } from '~/ui/search/search';
import { Select } from '~/ui/select/select';
import { MemoizedCountryRow } from './country/row';

import styles from './home.module.css';

type TSortingField = 'name' | 'population' | 'region' | 'capital' | null;

export function PageHome() {
  const [countries, setCountries] = useState<CountryInfo[]>([]);
  const [regionOptions, setRegionOptions] = useState<string[]>([]);
  const [region, setRegion] = useState<string>('All');
  const [sorting, setSorting] = useState<{ field: TSortingField; order: number }>({ field: 'name', order: 1 });
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let data = search !== '' ? countries.filter(c => c.name.official.toLowerCase().includes(search)) : countries;
    if (region !== 'All') data = data.filter(c => c.region === region);
    return data;
  }, [search, region, countries]);

  const sorted = useMemo(() => {
    const { field, order } = sorting;
    return filtered.sort((a, b) => {
      switch (field) {
        case 'name':
          return a.name.official > b.name.official ? order : -order;
        case 'population':
          return a.population > b.population ? order : -order;
        case 'region':
          return a.region > b.region ? order : -order;
        case 'capital':
          if (!a.capital || !b.capital) return 0;
          return a.capital[0] > b.capital[0] ? order : -order;
        default:
          return 0;
      }
    });
  }, [filtered, sorting]);

  useEffect(() => {
    Loader.show();
    apiRequest
      .all()
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
        }
        if (data) {
          setCountries(data);
          setRegionOptions(['All', ...new Set(data.map(c => c.region))]);
        }
      })
      .finally(Loader.hide);
  }, []);

  const getDirection = useCallback(
    (field: string) => {
      if (sorting.field === field) {
        return <span className={styles.order}>{sorting.order === -1 ? '▲' : '▼'}</span>;
      }
      return null;
    },
    [sorting]
  );

  const handleSwitchSorting = (field: TSortingField) => () =>
    setSorting(prev => ({ field, order: field === prev.field ? prev.order * -1 : prev.order }));

  if (error) return <h2>{error}</h2>;

  return (
    <>
      <h1 className={styles.header}>Countries</h1>
      <div className={styles.filters}>
        <Search placeholder="Search by country" onChange={setSearch} />
        <Select name="region" placeholder="Filter by region" options={regionOptions} onChange={setRegion} />
      </div>
      <div className={styles.total}>Total: {sorted.length}</div>
      <table className={styles.table}>
        <thead className={styles.table__header}>
          <tr>
            <th>Flag</th>
            <th onClick={handleSwitchSorting('name')}>Country {getDirection('name')}</th>
            <th onClick={handleSwitchSorting('capital')}>Capital {getDirection('capital')}</th>
            <th onClick={handleSwitchSorting('population')}>Population {getDirection('population')}</th>
            <th onClick={handleSwitchSorting('region')}>Region {getDirection('region')}</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((country, i) => (
            <MemoizedCountryRow key={i} country={country} />
          ))}
        </tbody>
      </table>
    </>
  );
}

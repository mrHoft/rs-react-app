import React from 'react';
import type { CountryInfo } from '~/api/types';

import styles from './card.module.css';

function CountryCard({ country }: { country: CountryInfo }) {
  return (
    <>
      <h3 className={styles.card__header}>{country.name.official}</h3>
      <div className={styles.card__details}>
        <div>Capital:</div>
        <div>{country.capital ? country.capital.join(', ') : '—'}</div>
        <div>Population:</div>
        <div>{country.population}</div>
        <div>Region:</div>
        <div>{country.region}</div>
        <div>Area:</div>
        <div>
          {country.area} km<sup>2</sup>
        </div>
        <div>Timezones:</div>
        <div>{country.timezones ? country.timezones.join(', ') : '—'}</div>
        <div>Languages:</div>
        <div>{country.languages ? Object.values(country.languages).join(', ') : '—'}</div>
        <div>Currencies:</div>
        <div>
          {country.currencies
            ? Object.values(country.currencies)
                .map(c => c.name)
                .join(', ')
            : '—'}
        </div>
      </div>
      <img height={100} src={country.flags.svg} alt={country.cca2} />
    </>
  );
}

export const MemoizedCountryCard = React.memo(CountryCard, (prev, cur) => prev.country.cca2 === cur.country.cca2);

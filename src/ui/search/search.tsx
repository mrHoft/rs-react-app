import React from 'react';

import styles from './search.module.css';

export function Search({ placeholder }: { placeholder: string }) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = String(form.get('query'));
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search} onClick={e => e.stopPropagation()}>
      <div className={styles.search__field}>
        <input type="text" name="query" placeholder=" " autoComplete="off" className={styles.search__input} />
        <button type="reset" className={styles.search__clear} />
        <button type="submit" className={styles.search__submit} />
        <div className={styles.search__placeholder}>{placeholder}</div>
      </div>
    </form>
  );
}

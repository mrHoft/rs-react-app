import React from 'react';

import styles from './search.module.css';

export function Search({ placeholder, onChange }: { placeholder: string; onChange?: (value: string) => void }) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = String(form.get('query'));
    if (onChange) onChange(value.toLowerCase());
  };

  const handleReset = () => {
    if (onChange) onChange('');
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className={styles.search} onClick={e => e.stopPropagation()}>
      <div className={styles.search__field}>
        <input type="text" name="query" placeholder=" " autoComplete="off" className={styles.search__input} />
        <button type="reset" className={styles.search__clear} />
        <button type="submit" className={styles.search__submit} />
        <div className={styles.search__placeholder}>{placeholder}</div>
      </div>
    </form>
  );
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { routes } from '~/pages';
import { formUpdate, type AppFormData } from '~/store/form';
import type { TAppDispatch, TRootState } from '~/store/store';

import styles from './home.module.css';

const thisPath = '/';
const noImgSrc = '/image-broken.svg';

let timer: ReturnType<typeof setTimeout> | null = null;

export function PageHome() {
  const { curData, allData } = useSelector((state: TRootState) => state.form);
  const [newData, setNewData] = useState<AppFormData>(curData);
  const dispatch = useDispatch<TAppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const data = allData.length && allData[allData.length - 1];
    if (data) {
      setNewData(data);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => dispatch(formUpdate(data)), 4000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [dispatch, allData]);

  const getElement = (key: string, value?: string | number | boolean) => {
    if (key === 'accept') return value ? '\u2714' : '\u274C';
    return value;
  };

  const getTableRows = (data: AppFormData, markNew = false) => {
    const length = Object.keys(data).length;
    const value = data.picture;
    const isNew = markNew && curData.picture !== value;
    const rows = [
      <tr key="picture">
        <td></td>
        <td></td>
        <td rowSpan={length} {...(isNew ? { className: styles.table__field_new } : undefined)}>
          <img height={100} src={value ? (value as string) : noImgSrc} />
        </td>
      </tr>,
    ];
    Object.keys(data).map(key => {
      const value = data[key as keyof AppFormData];
      const isNew = markNew && curData[key as keyof AppFormData] !== value;
      if (key === 'picture' || value === undefined) return null;
      rows.push(
        <tr key={key}>
          <td>{key}</td>
          <td {...(isNew ? { className: styles.table__field_new } : undefined)}>{getElement(key, value)}</td>
        </tr>
      );
    });

    return rows;
  };

  return (
    <>
      <nav className={styles.navigation}>
        {routes.map(
          (item, id) =>
            item.name &&
            item.path !== thisPath && (
              <button key={id} className="button" onClick={() => navigate(item.path)}>
                {item.name}
              </button>
            )
        )}
      </nav>
      <div>
        <h2 className={styles.header}>Form data</h2>
        <table>
          <thead className={styles.table__header}>
            <tr>
              <td>field</td>
              <td>value</td>
              <td>picture</td>
            </tr>
          </thead>
          <tbody className={styles.table__body}>{getTableRows(newData, true)}</tbody>
        </table>
      </div>
      {allData.length > 0 && (
        <details>
          <summary className={styles.header} style={{ cursor: 'pointer' }}>{`Requests (${allData.length})`}</summary>
          {allData.reduceRight<React.ReactNode[]>((acc, curr, i) => {
            acc.push(
              <table key={i}>
                <thead className={styles.table__header}>
                  <tr>
                    <td>field</td>
                    <td>value</td>
                    <td>picture</td>
                  </tr>
                </thead>
                <tbody className={styles.table__body}>{getTableRows(curr)}</tbody>
              </table>
            );
            return acc;
          }, [])}
        </details>
      )}
    </>
  );
}

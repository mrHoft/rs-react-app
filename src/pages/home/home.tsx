import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { routes } from '~/pages';
import { formUpdate, type FormData } from '~/store/form';
import type { TAppDispatch, TRootState } from '~/store/store';

import styles from './home.module.css';

const thisPath = '/';
const noImgSrc = '/image-broken.svg';

let timer: ReturnType<typeof setTimeout> | null = null;

export function PageHome() {
  const { data, newData } = useSelector((state: TRootState) => state.form);
  const dispatch = useDispatch<TAppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => dispatch(formUpdate(newData)), 4000);
  }, [dispatch, newData]);

  const getElement = (key: string, value?: string | number | boolean) => {
    if (key === 'accept') return value ? '\u2714' : '\u274C';
    return value;
  };

  const getTableRows = () => {
    const length = Object.keys(newData).length;
    const value = newData.picture;
    const isNew = data.picture !== value;
    const rows = [
      <tr key="picture">
        <td></td>
        <td></td>
        <td rowSpan={length} {...(isNew ? { className: styles.table__field_new } : undefined)}>
          <img height={100} src={value ? (value as string) : noImgSrc} />
        </td>
      </tr>,
    ];
    Object.keys(newData).map(key => {
      const value = newData[key as keyof FormData];
      const isNew = data[key as keyof FormData] !== value;
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
          <tbody className={styles.table__body}>{getTableRows()}</tbody>
        </table>
      </div>
    </>
  );
}

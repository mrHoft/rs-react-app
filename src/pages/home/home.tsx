import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { routes } from '~/pages';
import type { TRootState } from '~/store/store';

import styles from './home.module.css';

const thisPath = '/';

export function PageHome() {
  const { form } = useSelector((state: TRootState) => state.form);
  // const dispatch = useDispatch<TAppDispatch>();
  const navigate = useNavigate();

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
        <h2>Form data</h2>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </>
  );
}

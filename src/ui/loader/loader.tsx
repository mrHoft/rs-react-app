import React from 'react';

import styles from './loader.module.css';

interface LoaderComponent {
  show: () => void;
  hide: () => void;
  (): React.ReactNode;
}
export const Loader: LoaderComponent = (() => {
  const state: {
    set: React.Dispatch<React.SetStateAction<boolean>> | null;
  } = { set: null };

  const Container = () => {
    const [visible, setVisible] = React.useState(false);
    state.set = setVisible;

    return visible ? (
      <div className={styles.loader}>
        <div className={styles.loader__spinner} />
      </div>
    ) : null;
  };

  Container.show = () => {
    if (state.set) state.set(true);
  };

  Container.hide = () => {
    if (state.set) state.set(false);
  };

  return Container;
})();

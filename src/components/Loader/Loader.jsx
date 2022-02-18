import React from 'react';
import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';
const Loader = () => (
  <div>
    <Oval
      type="Oval"
      color="#258899"
      height={40}
      width={40}
      timeout={3000}
      className={styles.Loader}
    />
  </div>
);

export default Loader;

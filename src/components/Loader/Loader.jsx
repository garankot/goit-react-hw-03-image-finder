import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';
const Loader = () => (
  <div>
    <Oval
      className={styles.Loader}
      type="Oval"
      color="#258899"
      height={40}
      width={40}
      timeout={3000} // 3 secs
    />
  </div>
);

export default Loader;

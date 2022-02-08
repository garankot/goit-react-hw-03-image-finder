// import React from 'react';
import { TailSpin } from 'react-loader-spinner';
const Loader = () => (
  <div>
    <TailSpin
      type="Oval"
      color="#258899"
      height={80}
      width={80}
      timeout={3000} // 3 secs
    />
  </div>
);

export default Loader;

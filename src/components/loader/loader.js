import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const Loader = () => (
  <div
    className="position-fixed vh-100 vw-100 d-flex justify-content-center align-items-center bg-light"
    style={{ opacity: 0.2, zIndex: 9999999999 }}
  >
    <HashLoader color="#fff" loading size={80} />
  </div>
);

export default Loader;

import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => (
  <div>Whoops, something went wrong: {message}</div>
);

ErrorMessage.defaultProps = {
  message: 'images not found',
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;

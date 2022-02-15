import React from 'react';
import PropTypes from 'prop-types';
import { Cont } from './Container.styled';

const Container = ({ children }) => <Cont>{children}</Cont>;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;

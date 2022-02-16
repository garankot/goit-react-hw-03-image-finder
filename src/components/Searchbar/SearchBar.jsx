import React from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => (
  <header className={styles.SearchBar}>
    <SearchForm onSubmit={onSubmit} />
  </header>
);

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

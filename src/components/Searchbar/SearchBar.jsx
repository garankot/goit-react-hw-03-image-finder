import React from 'react';
import PropTypes from 'prop-types';
import SearchForm from '../Searchbar/SearchForm';

const SearchBar = ({ onSubmit }) => (
  <header>
    <SearchForm onSubmit={onSubmit} />
  </header>
);

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

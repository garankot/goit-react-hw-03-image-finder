import React from 'react';
import PropTypes from 'prop-types';
import SearchForm from '../Searchbar/SearchForm';
import { SearchBarWrap } from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => (
  <SearchBarWrap>
    <SearchForm onSubmit={onSubmit} />
  </SearchBarWrap>
);

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

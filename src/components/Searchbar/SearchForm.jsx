import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.css';

class SearchForm extends Component {
  state = {
    search: '',
  };
  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const search = this.state.search.trim().toLowerCase();
    this.props.onSubmit(search);
    this.setState({ search: '' });
  };
  f;

  render() {
    const { search } = this.state;
    return (
      <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input className={styles.SearchFormInput}
          type="text"
          value={search}
          onChange={this.handleChange}
          autoComplete="off"
          placeholder="Search images and photos"
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;

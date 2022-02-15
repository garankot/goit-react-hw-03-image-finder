import React, { Component } from 'react';
import SearchBar from './Searchbar/SearchBar';
import pixabayApi from '../api/pixabayApi';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Container from '../Container/Container';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    error: null,
    empty: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, isLoading } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.fetchImages();
    }
    if (isLoading) this.scrollImages();
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
      empty: false,
    });
  };

  scrollImages = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    const options = { searchQuery, currentPage };
    this.setState({ isLoading: true });

    pixabayApi(options)
      .then(images => {
        if (images.length === 0) this.setState({ empty: true });
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, isLoading, error, empty } = this.state;
    const loadMoreButton = images.length > 0 && !isLoading;
    return (
      <Container>
        <SearchBar onSubmit={this.onChangeQuery} />
        {error && <ErrorMessage message={error.message} />}
        {empty && <ErrorMessage />}
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {loadMoreButton && <Button onClick={this.fetchImages} />}
      </Container>
    );
  }
}

export default App;

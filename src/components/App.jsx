import React, { Component } from 'react';
import pixabayApi from '../api/pixabayApi';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Container from './Container/Container';
import Searchbar from './Searchbar/SearchBar';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    error: null,
    empty: false,
    showModal: false,
    description: '',
    largeImage: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, isLoading } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.fetchImages();
    }
    if (isLoading) this.scrollImages();
  }

  handlerClickLoadMore = () => {
    this.setState(({ currentPage }) => ({ currentPage: currentPage + 1 }));
  };
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

  showModal = event => {
    event.preventDefault();
    const { href, dataset } = event.currentTarget;
    this.setState({
      description: dataset.attr,
      largeImage: href,
    });
    this.toggleModal();
  };

  closeModal = () => {
    this.setState({
      description: '',
      largeImage: '',
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, isLoading, error, empty } = this.state;
    const loadMoreButton = images.length === [];
    return (
      <Container>
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <ErrorMessage message={error.message} />}
        {empty && <ErrorMessage />}
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.showModal} />
        )}
        {isLoading && <Loader />}

        {loadMoreButton && <Button onClick={this.fetchImages} />}
      </Container>
    );
  }
}

export default App;

import React, { Component } from 'react';

import Searchbar from './Searchbar/SearchBar';
import pixabayApi from '../api/pixabayApi';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Container from './Container/Container';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    error: null,
    empty: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
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

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  // showModal = event => {
  //   event.preventDefault();
  //   const { href, dataset } = event.currentTarget;
  //   this.setState({
  //     description: dataset.attr,
  //     largeImage: href,
  //   });
  //   this.toggleModal();
  // };
  showModal = imgUrl => {
    // console.log(imgUrl);
    this.setState({ imgUrl }, () => {
      this.toggleModal();
    });
  };
  handleronClickImage = (activeImge, tags) => {
    this.setState({ activeImge, tags });
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  closeModal = () => {
    this.setState({
      description: '',
      largeImage: '',
    });
    this.toggleModal();
  };

  render() {
    const {
      showModal,
      largeImage,
      description,
      images,
      isLoading,
      error,
      empty,
      // imgUrl,
    } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    return (
      <Container>
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <ErrorMessage message={error.message} />}
        {empty && <ErrorMessage />}
        {showModal && (
          <Modal
            url={largeImage}
            description={description}
            closeModal={this.toggleModal}
          >
            {/* <img src={imgUrl} alt="" /> */}
          </Modal>
        )}
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages} />}
      </Container>
    );
  }
}

export default App;

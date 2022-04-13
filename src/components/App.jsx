import React, { Component } from 'react';
import pixabayApi from '../api/pixabayApi';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
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
    description: '',
    fullSize: '',
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

  // showModal = event => {
  //   event.preventDefault();
  //   const { href, alt } = event.currentTarget;
  //   this.setState({
  //     description: alt,
  //     fullSize: href,
  //   });
  //   this.toggleModal();
  // };

  closeModal = () => {
    this.setState({
      description: '',
      fullSize: '',
    });
    this.toggleModal(Modal);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleClick = event => {
    const { showModal } = this.state;
    if (showModal) {
      this.setState({
        showModal: !showModal,
        alt: null,
        fullSize: null,
      });
    } else {
      if (event.target.nodeName !== 'IMG') return;
      this.setState({
        showModal: !showModal,
        alt: event.target.alt,
        fullSize: event.target.dataset.fullsize,
      });
    }
  };

  render() {
    const {
      images,
      isLoading,
      error,
      empty,
      showModal,
      // largeImage,
      // description,
      fullSize,
      alt,
    } = this.state;
    const loadMoreButton =
      images.length > 0 && images.length % 12 === 0 && !isLoading;
    return (
      <Container>
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <ErrorMessage message={error.message} />}
        {empty && <ErrorMessage />}
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleClick} />
        )}
        {isLoading && <Loader />}
        {/* {showModal && (
          <Modal onClose={this.handleClick} url={fullSize} alt={description} />
        )} */}
        {showModal && (
          // <Modal showModal={this.toggleModal}>
          //   <img src={largeImage} alt={description} />
          // </Modal>
          <Modal onClose={this.closeModal} url={fullSize} name={alt} />
        )}
        {loadMoreButton && <Button onClick={this.fetchImages} />}
      </Container>
    );
  }
}

export default App;

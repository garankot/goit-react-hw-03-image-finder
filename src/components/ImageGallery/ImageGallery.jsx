import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
    description: '',
    largeImage: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
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

  render() {
    const { images } = this.props;
    const { showModal, largeImage, description } = this.state;
    return (
      <>
        {showModal && (
          <Modal
            url={largeImage}
            description={description}
            closeModal={this.closeModal}
          />
        )}
        <ul>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <li key={id}>
              <ImageGalleryItem
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                description={tags}
                onClick={this.showModal}
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

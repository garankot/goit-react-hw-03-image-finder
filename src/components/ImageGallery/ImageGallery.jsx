import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal/Modal';
import styles from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    showModal: false,
    description: '',
    largeImage: '',
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
        <ul className={styles.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <li key={id} className={styles.ImageGalleryItem}>
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
export default ImageGallery;

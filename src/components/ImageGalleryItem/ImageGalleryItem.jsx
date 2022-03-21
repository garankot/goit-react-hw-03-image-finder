import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  description,
  largeImageURL,
  onClick,
}) => (
  <a href={largeImageURL} data-attr={description}>
    <img
      src={webformatURL}
      alt={description}
      className={styles.ImageGalleryItemImage}
      onClick={onClick}
    />
  </a>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;

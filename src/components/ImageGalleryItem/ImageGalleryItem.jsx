import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, description, largeImageURL }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      className={styles.ImageGalleryItemImage}
      src={webformatURL}
      alt={description}
      data-fullsize={largeImageURL}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;

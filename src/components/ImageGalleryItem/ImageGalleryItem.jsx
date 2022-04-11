// import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

// const ImageGalleryItem = ({
//   id,
//   showModal,
//   webformatURL,
//   tags,
//   largeImageURL,
//   onClick,
// }) => {
//   return (
//     <>
//       < key={id} onClick={showModal}>
//         <img
//           className={styles.ImageGalleryItemImage}
//           src={webformatURL}
//           alt={tags}
//           largeImageURL={largeImageURL}
//           onClick={onClick}
//         />
//       </li>
//     </>
//   );
// };

const ImageGalleryItem = ({
  webformatURL,
  tags,
  description,
  largeImageURL,
  onClick,
}) => (
  <a href={largeImageURL} data-attr={description} onClick={onClick}>
    <img
      src={webformatURL}
      alt={tags}
      className={styles.ImageGalleryItemImage}
      // onClick={onClick}
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

import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGalleryItem = ({ options, openModal }) => {
  const { webformatURL, tags, largeImageURL } = options;
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        className={s.ImageGalleryItemImage}
        onClick={openModal}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  options: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const images = this.props.photos;
    const page = this.props.page;
    if (page !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
    return (
      <ul
        className={s.ImageGallery}
        onClick={event => this.props.forModal(event)}
      >
        {images.map(item => (
          <ImageGalleryItem
            key={item.id}
            options={item}
            openModal={this.props.openModal}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  forModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;

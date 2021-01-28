import { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/';

export default class ImageGallery extends Component {
  render() {
    const images = this.props.photos;
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
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

import { Component } from 'react';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, largeImageURL } = this.props.options;

    return (
      <li className={s.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          data-source={largeImageURL}
          className={s.ImageGalleryItemImage}
          onClick={this.props.openModal}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;

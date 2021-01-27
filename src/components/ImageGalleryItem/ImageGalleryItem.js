import { Component } from 'react';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    options: this.props.options,
  };

  // imageLink = () => {
  //   const { largeImageURL } = this.state.options;
  //   console.log(this.props.getImageLink(largeImageURL));
  //   // return this.props.getImageLink(largeImageURL);
  // };

  // toggleModal = () => {
  //   this.setState(prevState => ({
  //     showModal: !prevState.showModal,
  //   }));
  // };

  render() {
    const { webformatURL, tags } = this.state.options;
    return (
      <li className={s.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={s.ImageGalleryItemImage}
          // onClick={this.toggleModal}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;

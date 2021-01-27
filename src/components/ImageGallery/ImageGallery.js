import { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/';

const KEY = '14467768-9171c4f16b15a9d8391496270';
const API = `https://pixabay.com/api/?key=${KEY}`;

export default class ImageGallery extends Component {
  state = {
    gallery: [],
    loading: false,
  };

  componentDidMount() {
    this.handleGetNewFatch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.page !== this.props.page) {
      this.handleGetFatch();
    }

    if (prevProps.query !== this.props.query) {
      this.handleGetNewFatch();
      this.props.resetPage();
    }
  }

  handleGetNewFatch = () => {
    this.setState({ loading: true });
    fetch(
      `${API}&q=${this.props.query}&per_page=12&image_type=photo&orientation=horizontal&page=1`,
    )
      .then(resolve => resolve.json())
      .then(obj => this.setState({ gallery: obj.hits }))
      .finally(() => {
        this.getGalleryLengthForRenderButton();
        this.setState({ loading: false });
        this.props.loading(this.state.loading);
      });
  };

  handleGetFatch = () => {
    this.setState({ loading: true });
    fetch(
      `${API}&q=${this.props.query}&per_page=12&image_type=photo&orientation=horizontal&page=${this.props.page}`,
    )
      .then(resolve => resolve.json())
      .then(obj =>
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...obj.hits],
        })),
      )
      .finally(() => {
        this.setState({ loading: false });
        this.props.loading(this.state.loading);
      });
  };

  getGalleryLengthForRenderButton() {
    const { gallery } = this.state;
    this.props.length(gallery.length);
  }

  render() {
    const { gallery } = this.state;
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    return (
      <ul className={s.ImageGallery}>
        {gallery.map(item => (
          <ImageGalleryItem
            key={item.id}
            options={item}
            // onOpenModal={this.props.modal}
          />
        ))}
      </ul>
    );
  }
}

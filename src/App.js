import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import loaderStyle from './components/Loader/Loader.module.css';
import Loader from 'react-loader-spinner';
import Modal from './components/Modal';

const KEY = '14467768-9171c4f16b15a9d8391496270';
const API = `https://pixabay.com/api/?key=${KEY}`;

class App extends Component {
  state = {
    gallery: [],
    searchQuery: '',
    page: 1,
    galleryLength: null,
    loading: false,
    showModal: false,
    modalOptions: {},
    error: null,
  };

  componentDidMount() {
    this.handleFetch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.handleFetch();
    }
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.resetPage();
      this.handleFetch();
    }

    if (prevState.error !== this.state.error) {
      toast.error(this.state.error.message);
      return;
    }
  }

  handleFetch = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    fetch(
      `${API}&q=${searchQuery}&per_page=12&image_type=photo&orientation=horizontal&page=${page}`,
    )
      .then(response => response.json())
      .then(obj => {
        if (obj.hits.length === 0) {
          this.setState({ gallery: [] });
          return Promise.reject(
            new Error(
              `По запросу ${this.state.searchQuery} ничего нет. Введите другой запрос.`,
            ),
          );
        }

        if (page === 1) {
          return this.setState({ gallery: [...obj.hits] });
        }
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...obj.hits],
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.getGalleryLength();
        this.setState({ loading: false });
      });
  };

  handleQuerySubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, loading: true };
    });
  };

  resetPage = () => {
    return this.setState({ page: 1 });
  };

  getGalleryLength = () => {
    const { gallery } = this.state;
    return this.setState({ galleryLength: gallery.length });
  };

  getImageOptionsForModal = event => {
    this.setState({
      modalOptions: {
        src: event.target.dataset.source,
        alt: event.target.alt,
      },
    });
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const {
      gallery,
      galleryLength,
      loading,
      showModal,
      modalOptions,
      page,
    } = this.state;
    return (
      <div className="App">
        <Searchbar onHandleSubmit={this.handleQuerySubmit} />
        <ToastContainer position="top-right" autoClose={3000} />
        <ImageGallery
          photos={gallery}
          forModal={this.getImageOptionsForModal}
          openModal={this.toggleModal}
          page={page}
        />
        {loading && (
          <Loader
            type="Circles"
            className={loaderStyle.loader}
            color="#00BFFF"
            height={60}
            width={60}
          />
        )}
        {(galleryLength >= 12) & (loading === false) && (
          <Button click={this.handleLoadMoreClick} />
        )}

        {showModal && (
          <Modal options={modalOptions} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;

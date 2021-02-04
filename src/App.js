import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Component } from 'react';
import { fetchGallery } from './services/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import loaderStyle from './components/Loader/Loader.module.css';
import Loader from 'react-loader-spinner';
import Modal from './components/Modal';

class App extends Component {
  state = {
    gallery: [],
    searchQuery: '',
    page: 1,
    loading: false,
    showModal: false,
    modalOptions: {},
  };

  componentDidMount() {
    this.handleFetch();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.handleFetch();
    }
    if (prevState.searchQuery !== this.state.searchQuery) {
      await this.setState({ page: 1, gallery: [] });
      this.handleFetch();
    }
  }

  handleFetch = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    fetchGallery(searchQuery, page)
      .then(obj => {
        if (obj.hits.length === 0) {
          toast.error(
            `По запросу ${this.state.searchQuery} ничего нет. Введите другой запрос.`,
          );
          return;
        }
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...obj.hits],
        }));
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ loading: false });
        if (page !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
  };

  handleQuerySubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handleLoadMoreClick = async () => {
    await this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  getImageOptionsForModal = event => {
    this.setState({
      modalOptions: {
        src: event.target.dataset.source,
        alt: event.target.alt,
        loading: false,
      },
    });
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const { gallery, showModal, modalOptions, loading, page } = this.state;
    return (
      <div className="App">
        <Searchbar onHandleSubmit={this.handleQuerySubmit} />
        <ToastContainer position="top-right" autoClose={3000} />
        {gallery.length > 0 && (
          <ImageGallery
            photos={gallery}
            forModal={this.getImageOptionsForModal}
            openModal={this.toggleModal}
            page={page}
          />
        )}
        {loading && (
          <Loader
            type="Circles"
            className={loaderStyle.loader}
            color="#00BFFF"
            height={60}
            width={60}
          />
        )}
        {(this.state.gallery.length >= 12) & (loading === false) && (
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

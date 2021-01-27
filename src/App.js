import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import loaderStyle from './components/Loader/Loader.module.css';
import Loader from 'react-loader-spinner';
import Modal from './components/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    galleryLength: null,
    loading: false,
    showModal: false,
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

  getGalleryLength = length => {
    this.setState({ galleryLength: length });
  };

  getLoadingState = loadingState => {
    this.setState({ loading: loadingState });
  };

  getModalState = modalState => {
    this.setState({ showModal: modalState });
    console.log('открыли модалку');
  };

  render() {
    const { searchQuery, page, galleryLength, loading, showModal } = this.state;
    return (
      <div className="App">
        <Searchbar onHandleSubmit={this.handleQuerySubmit} />
        <ImageGallery
          loading={this.getLoadingState}
          length={this.getGalleryLength}
          query={searchQuery}
          page={page}
          resetPage={this.resetPage}
          modal={this.getModalState}
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
        {galleryLength > 0 && <Button click={this.handleLoadMoreClick} />}
      </div>
    );
  }
}

export default App;

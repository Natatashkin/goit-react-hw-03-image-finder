import s from './Modal.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import loaderStyle from '../Loader/Loader.module.css';
import Loader from 'react-loader-spinner';
// import Loader from '../Loader/';
import Image from './Image';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { alt, src } = this.props.options;

    return createPortal(
      <div
        className={s.Overlay}
        onClick={event => this.handleOverlayClick(event)}
      >
        {this.props.status === 'pending' && (
          <Loader
            type="Circles"
            className={loaderStyle.loader}
            color="#00BFFF"
            height={60}
            width={60}
          />
        )}

        {this.props.status === 'resolved' && (
          <div className={s.Modal}>
            <Image src={src} alt={alt} />
          </div>
        )}
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  options: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

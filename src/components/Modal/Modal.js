import s from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  render() {
    return createPortal(
      <div className={s.Overlay}>
        <div className={s.Modal}>
          <img src={this.props.imageLink} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#root');

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

  handleClick = () => {
    this.props.onClose();
  };

  render() {
    const { url, description } = this.props;
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleOverlayClick}>
        <div className={styles.Modal}>
          <img src={url} alt={description} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default Modal;

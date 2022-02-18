import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#root');

class Modal extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleOverlayClick = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      this.props.closeModal();
    }
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
  closeModal: PropTypes.func.isRequired,
};
export default Modal;

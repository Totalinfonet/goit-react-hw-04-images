import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.handleModalKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.handleModalKeyDown);
  }

  render() {
    const {
      showModal,
      selectedImage,
      selectedImageLoaded,
      handleModalClose,
      handleImageLoad,
      handleModalKeyDown,
    } = this.props;

    return (
      <>
        {showModal && (
          <div
            className="overlay"
            onClick={handleModalClose}
            onKeyDown={handleModalKeyDown}
            tabIndex="0"
          >
            <div className="modal">
              {!selectedImageLoaded && <Loader />}
              <img
                src={selectedImage.largeImageURL}
                alt=""
                onLoad={handleImageLoad}
                style={{ display: selectedImageLoaded ? 'block' : 'none' }}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  selectedImage: PropTypes.object.isRequired,
  selectedImageLoaded: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  handleModalKeyDown: PropTypes.func.isRequired,
  handleImageLoad: PropTypes.func.isRequired,
};

export default Modal;

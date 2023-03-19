import Loader from '../Loader/Loader';

const Modal = ({
  showModal,
  selectedImage,
  selectedImageLoaded,
  handleModalClose,
  handleModalKeyDown,
  handleImageLoad,
}) => {
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
};

export default Modal;

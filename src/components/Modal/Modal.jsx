import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';

const Modal = ({
  showModal,
  selectedImage,
  selectedImageLoaded,
  handleModalClose,
  handleImageLoad,
  handleModalKeyDown,
}) => {
  const memoizedHandleModalKeyDown = useCallback(
    event => {
      handleModalKeyDown(event);
    },
    [handleModalKeyDown]
  );

  useEffect(() => {
    document.addEventListener('keydown', memoizedHandleModalKeyDown);
    return () => {
      document.removeEventListener('keydown', memoizedHandleModalKeyDown);
    };
  }, [memoizedHandleModalKeyDown]);

  return (
    <>
      {showModal && (
        <div
          className="overlay"
          onClick={handleModalClose}
          onKeyDown={memoizedHandleModalKeyDown}
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

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  selectedImage: PropTypes.object.isRequired,
  selectedImageLoaded: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  handleModalKeyDown: PropTypes.func.isRequired,
  handleImageLoad: PropTypes.func.isRequired,
};

export default Modal;

// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Loader from '../Loader/Loader';

// const Modal = ({
//   showModal,
//   selectedImage,
//   selectedImageLoaded,
//   handleModalClose,
//   handleImageLoad,
//   handleModalKeyDown,
// }) => {
//   useEffect(() => {
//     document.addEventListener('keydown', handleModalKeyDown);
//     console.log('keydown');
//     return () => {
//       document.removeEventListener('keydown', handleModalKeyDown);
//     };
//   }, [handleModalKeyDown]);

//   return (
//     <>
//       {showModal && (
//         <div
//           className="overlay"
//           onClick={handleModalClose}
//           onKeyDown={handleModalKeyDown}
//           tabIndex="0"
//         >
//           <div className="modal">
//             {!selectedImageLoaded && <Loader />}
//             <img
//               src={selectedImage.largeImageURL}
//               alt=""
//               onLoad={handleImageLoad}
//               style={{ display: selectedImageLoaded ? 'block' : 'none' }}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// Modal.propTypes = {
//   showModal: PropTypes.bool.isRequired,
//   selectedImage: PropTypes.object.isRequired,
//   selectedImageLoaded: PropTypes.bool.isRequired,
//   handleModalClose: PropTypes.func.isRequired,
//   handleModalKeyDown: PropTypes.func.isRequired,
//   handleImageLoad: PropTypes.func.isRequired,
// };

// export default Modal;

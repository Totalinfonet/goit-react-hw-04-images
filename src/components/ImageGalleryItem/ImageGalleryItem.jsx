import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, handleImageClick }) => {
  return (
    <li className="gallery-item">
      <img
        className="image"
        src={webformatURL}
        alt=""
        onClick={handleImageClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  handleImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

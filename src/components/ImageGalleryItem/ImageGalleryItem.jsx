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

export default ImageGalleryItem;

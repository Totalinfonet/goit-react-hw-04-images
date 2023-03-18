export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onImageClick,
}) => {
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt="" onClick={onImageClick} />
    </li>
  );
};

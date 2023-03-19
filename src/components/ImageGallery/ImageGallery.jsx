import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, handleImageClick }) => {
  return (
    <ul className="gallery">
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          handleImageClick={() =>
            handleImageClick({ id, webformatURL, largeImageURL })
          }
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

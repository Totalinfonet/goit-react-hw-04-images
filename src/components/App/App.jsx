import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import Searchbar from '../Searchbar/Searchbar';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ImageGallery from '../ImageGallery/ImageGallery';

const API_KEY = '33365759-bdd854990cd5a8ba018a7d8b1';
const BASE_URL = 'https://pixabay.com/api/';

const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageLoaded, setSelectedImageLoaded] = useState(false);

  const handleSubmit = async query => {
    if (query === '') {
      Notiflix.Notify.info('Enter your search query');
      return;
    } else {
      clearGallery();
      setQuery(query);
      setPage(1);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchImages = async () => {
      setLoading(true);

      try {
        const params = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

        const response = await axios.get(BASE_URL + params);
        if (response.data.hits?.length > 0) {
          setImages(prevImages =>
            page === 1
              ? response.data.hits
              : [...prevImages, ...response.data.hits]
          );
          setError(null);
        } else {
          setImages([]);
          setError(null);
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        Notiflix.Notify.failure('Failed to fetch images. Please try again.');
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const clearGallery = () => {
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
  };

  const handleImageClick = image => {
    setShowModal(true);
    setSelectedImage(image);
    setSelectedImageLoaded(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalKeyDown = event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      handleModalClose();
    }
  };

  const handleImageLoad = () => {
    setSelectedImageLoaded(true);
  };

  return (
    <div className="app">
      <Searchbar handleSubmit={handleSubmit} />

      {loading && <Loader />}

      {error && <div>Something went wrong: {error.message}</div>}

      {images.length > 0 && (
        <ImageGallery images={images} handleImageClick={handleImageClick} />
      )}

      {!loading && images.length > 0 && images.length % 12 === 0 && (
        <Button handleClick={handleLoadMore} text={'Load more'} />
      )}
      {showModal && (
        <Modal
          showModal={showModal}
          selectedImage={selectedImage}
          selectedImageLoaded={selectedImageLoaded}
          handleModalClose={handleModalClose}
          handleModalKeyDown={handleModalKeyDown}
          handleImageLoad={handleImageLoad}
        />
      )}
    </div>
  );
};
export default App;

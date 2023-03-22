import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from '../Searchbar/Searchbar';
import Notiflix from 'notiflix';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ImageGallery from '../ImageGallery/ImageGallery';

const API_KEY = '33365759-bdd854990cd5a8ba018a7d8b1';
const BASE_URL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    images: [],
    error: null,
    query: '',
    page: 1,
    loading: false,
    showModal: false,
    selectedImage: null,
    selectedImageLoaded: false,
  };

  componentDidMount() {
    if (this.state.query !== '') {
      this.fetchImages();
    }
  }

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;

    if (query === '') {
      Notiflix.Notify.info('Enter your search query');
    } else {
      this.setState({ page: 1, loading: true }, () => {
        this.fetchImages(query);
      });
    }
  };

  handleLoadMore = () => {
    const { query } = this.state;
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        loading: true,
      }),
      () => {
        this.fetchImages(query);
      }
    );
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ loading: true });

    try {
      const params = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

      const response = await axios.get(BASE_URL + params);
      if (response.data.hits?.length > 0) {
        this.setState(prevState => ({
          images:
            page === 1
              ? response.data.hits
              : [...prevState.images, ...response.data.hits],
          error: null,
        }));
      } else {
        this.setState({ images: [], error: null });
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleImageClick = image => {
    this.setState({
      showModal: true,
      selectedImage: image,
      selectedImageLoaded: false,
    });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handleModalKeyDown = event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.handleModalClose();
    }
  };

  handleImageLoad = () => {
    this.setState({ selectedImageLoaded: true });
  };

  render() {
    const {
      images,
      error,
      showModal,
      selectedImage,
      selectedImageLoaded,
      loading,
    } = this.state;

    return (
      <div className="app">
        <Searchbar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        {loading && <Loader />}

        {error && <div>Something went wrong: {error.message}</div>}

        {images.length > 0 && (
          <ImageGallery
            images={images}
            handleImageClick={this.handleImageClick}
          />
        )}

        {!loading && images.length > 0 && images.length % 12 === 0 && (
          <Button handleClick={this.handleLoadMore} text={'Load more'} />
        )}
        {showModal && (
          <Modal
            showModal={showModal}
            selectedImage={selectedImage}
            selectedImageLoaded={selectedImageLoaded}
            handleModalClose={this.handleModalClose}
            handleModalKeyDown={this.handleModalKeyDown}
            handleImageLoad={this.handleImageLoad}
          />
        )}
      </div>
    );
  }
}

import React, { Component } from 'react';
import axios from 'axios';
import { Blocks } from 'react-loader-spinner';

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

  componentDidUpdate(_, prevState) {
    if (
      prevState.images !== this.state.images &&
      this.state.images.length > 0
    ) {
      this.setState({ loading: false });
    }
  }

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;

    this.setState({ loading: true });
    setTimeout(() => {
      const params = `?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

      axios
        .get(BASE_URL + params)
        .then(response => {
          this.setState({ images: response.data.hits, error: null, page: 1 });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }, 1000);
  };

  handleLoadMore = () => {
    const { query, page } = this.state;
    this.setState({ loading: true });
    setTimeout(() => {
      const params = `?q=${query}&page=${
        page + 1
      }&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

      axios
        .get(BASE_URL + params)
        .then(response => {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
            error: null,
            page: prevState.page + 1,
          }));
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }, 1000);
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
      console.log(event);
      this.handleModalClose();
    }
  };

  handleImageLoad = () => {
    this.setState({ selectedImageLoaded: true });
  };

  render() {
    const { images, error, showModal, selectedImage, selectedImageLoaded } =
      this.state;

    return (
      <div className="app">
        <header className="searchbar">
          <form className="form" onSubmit={this.handleSubmit}>
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>

            <input
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleChange}
            />
          </form>
        </header>

        {this.state.loading && (
          <div className="loader">
            <Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
            />
          </div>
        )}

        {error && <div>Something went wrong: {error.message}</div>}

        <ul className="gallery">
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <li key={id} className="gallery-item">
              <img
                className="image"
                src={webformatURL}
                alt=""
                onClick={() =>
                  this.handleImageClick({ id, webformatURL, largeImageURL })
                }
              />
            </li>
          ))}
        </ul>
        {images.length > 0 && images.length % 12 === 0 && (
          <button className="load-btn" onClick={this.handleLoadMore}>
            Load more
          </button>
        )}
        {showModal && (
          <div
            className="overlay"
            onClick={this.handleModalClose}
            onKeyDown={this.handleModalKeyDown}
            tabIndex="0"
          >
            <div className="modal">
              {!selectedImageLoaded && (
                <Blocks
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                />
              )}
              <img
                src={selectedImage.largeImageURL}
                alt=""
                onLoad={this.handleImageLoad}
                style={{ display: selectedImageLoaded ? 'block' : 'none' }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

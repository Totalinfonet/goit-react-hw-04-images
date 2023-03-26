import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Searchbar = ({ handleSubmit }) => {
  const [query, setQuery] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    handleSubmit(query);
  };

  const handleChange = event => {
    setQuery(event.target.value);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={onSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

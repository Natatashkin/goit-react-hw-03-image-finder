import s from './Searchbar.module.css';
import React, { Component } from 'react';
// import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQuery = event => {
    console.log(event.target);
    console.log(event.currentTarget);

    this.setState({ searchQuery: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      alert('Введите поисковый запрос!');
      return;
    }
    this.props.onHandleSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    const { searchQuery } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            value={searchQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchQuery}
          />
        </form>
      </header>
    );
  }
}

import React, { Component } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineSearch } from 'react-icons/md';
import {
  SearchbarStyles,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery === '') {
      toast.error('Это не похоже на запрос, попробуйте ещё раз', {
        duration: 1000,
      });

      return;
    }
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };
  handleInputChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase().trim() });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <SearchbarStyles>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" aria-label="Search Button">
            <MdOutlineSearch size={26} />
          </SearchFormButton>

          <SearchFormInput
            onChange={this.handleInputChange}
            value={searchQuery}
            type="text"
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarStyles>
    );
  }
}

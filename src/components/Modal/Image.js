import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Image extends Component {
  render() {
    const alt = this.props.alt;
    const src = this.props.src;
    return <img src={src} alt={alt} />;
  }
}

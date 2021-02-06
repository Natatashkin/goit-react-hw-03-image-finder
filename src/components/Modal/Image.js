import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Image extends Component {
  render() {
    const { alt, src, onLoad } = this.props;
    return <img src={src} alt={alt} onLoad={this.props.onLoad} />;
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
};

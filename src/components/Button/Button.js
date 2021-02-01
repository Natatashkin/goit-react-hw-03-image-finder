import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

class Button extends Component {
  render() {
    return (
      <button
        type="button"
        className={s.loadMoreButton}
        onClick={this.props.click}
      >
        Load more...
      </button>
    );
  }
}

Button.propTypes = {
  click: PropTypes.func.isRequired,
};

export default Button;

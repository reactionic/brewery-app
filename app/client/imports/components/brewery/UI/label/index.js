import React from 'react';
import classnames from 'classnames';

var Label = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      customClasses: ''

    };
  },
  render() {

    return (
      <label className={this.props.customClasses}>
        {this.props.children}
      </label>
    );
  }
});

export default Label;

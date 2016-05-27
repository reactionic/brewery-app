import React from 'react';
import classnames from 'classnames';

var Input = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    onChange: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
    };
  },
  render() {

    var classes = classnames(
      'customInput',
      this.props.customClasses
    );



    return (
        <input defaultValue={this.props.defaultValue} onChange={this.props.onChange} className={classes}/>
    );
  }
});

export default Input;

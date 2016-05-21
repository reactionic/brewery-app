import React from 'react';
import classnames from 'classnames';

var CordovaLink = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    URL: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
    };
  },
  handleURL(){
    window.open(this.props.URL, '_system', 'location=yes');
    return false;
  },

  render() {
    var classes = classnames(
      this.props.customClasses
    );
    return (
      <a className={classes}
         href="#"
         onClick={this.handleURL}>
         {this.props.children}
      </a>
    )
  }
});

export default CordovaLink;

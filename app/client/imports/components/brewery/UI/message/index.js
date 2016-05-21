import React from 'react';
import classnames from 'classnames';

require('./message.css');

var Message = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    text: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      text: ''
    };
  },
  getInitialState:function(){
    return {
      classes: 'message--container'
    }
  },
  componentDidMount(){
    setTimeout(() => {
      this.setState({
        classes: this.state.classes + ' hide-container'
      })
    }, 7000);
  },
  render() {
    var classes = classnames(
      this.state.classes
    );

    return (
      <div className={classes}>
        {this.props.text}
        {this.props.children}
      </div>
    );
  }
});

export default Message;

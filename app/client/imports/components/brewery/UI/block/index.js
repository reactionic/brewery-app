import React from 'react';
import classnames from 'classnames';

var Block = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    align:React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      align:'centered'
    };
  },
  render() {
    var parentClasses = classnames(
      this.props.align === 'centered' ? 'center--parent' : '',
      this.props.customClasses
    );
    var childClasses = classnames(
      this.props.align === 'centered' ? 'center--child' : '',
    );

    return (
      <div className={parentClasses}>
        <div className={childClasses}>
        {this.props.children}
        </div>
      </div>
    );
  }
});

export default Block;

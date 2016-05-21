import React from 'react';
import classnames from 'classnames';

require('./img.css');

`WORKS LIKE THIS
If background property is present it loads as a background.

Then if you want UI ELEMENTS above the image putting as their child

example

<IonImage URL="images/beer.jpg" background>
  <Label>
         Search your beer
  </Label>
</IonImage>

If property background not presented it loads an image and you don't need to put the elements inside the IonImage

example

<IonImage URL="images/beer.jpg" background>

</IonImage>
<Label>
       Search your beer
</Label>

`



var IonImage = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    URL: React.PropTypes.string,
    background:React.PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      URL:'#'
    };
  },
  render() {
    var classes = classnames(
      {'img--fit': this.props.background},
      this.props.customClasses
    );
    if(!this.props.background){
      return (
        <img className={classes} src={this.props.URL}></img>
      );
    } else {
      var style = {
        background:'url('+this.props.URL+')',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }
    }
    return(
      <div style={style} className={classes}>
        {this.props.children}
      </div>
    )
  }
});

export default IonImage;

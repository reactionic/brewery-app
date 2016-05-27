import React from 'react';
import { IonContent } from 'reactionic';

var NoMatch = React.createClass({
  render() {
    return (
      <IonContent customClasses="padding"
                  {...this.props}>
        <div className="text-center padding">
          <span className="badge badge-assertive">NOT FOUND</span>
        </div>
      </IonContent>
    );
  }
});

export default NoMatch;

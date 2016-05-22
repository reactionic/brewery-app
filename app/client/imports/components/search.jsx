import React from 'react';
import { IonContent, IonList, IonItem, IonModal } from 'reactionic';
import IonImage from './ionic/IonImage';
import { CordovaLink } from './cordova';

var Search = React.createClass({
  propTypes: {
    ionSetTransitionDirection: React.PropTypes.func
  },
  contextTypes: {
    ionShowModal: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      ionSetTransitionDirection: null
    };
  },

  breweryInfo:function(brewery, event){
    //we build a modal for the brewery
    const title = brewery.name;

    const Modal = (
      <IonModal {...this.props}
                customTemplate={false}
                title={title}
                customClasses="">
        <div>
          Type: {brewery.type}<br/>
          First established: {brewery.established}
          <br/>
          website: <CordovaLink URL={brewery.website}>{brewery.website}</CordovaLink>
          <IonImage URL={brewery.images.squareLarge} />
        </div>
      </IonModal>
    )

    this.context.ionShowModal(Modal)

  },

  beerInfo:function(beer, event){
    //need to check undefined API, not stable
    const title = beer.name;
    const description = beer.description === undefined ? null : <p>Description: {beer.description}</p>
    const glass = beer.glass === undefined ? null : <p>Glass served: {beer.glass.name}</p>
    const temperature = beer.servingTemperatureDisplay === undefined ? null : <p>Serving Temperature: {beer.servingTemperatureDisplay}</p>

    const Modal = (
      <IonModal {...this.props}
                customTemplate={false}
                title={title}
                customClasses="">
        <div>
          {description}
          {glass}
          {temperature}
          <IonImage URL={beer.labels.large}/>
        </div>
      </IonModal>
    )

    this.context.ionShowModal(Modal)

  },

  render:function() {


    var breweries = this.props.location.state.breweries.map(brewery => {
      return (
        <IonItem key={brewery.id} onClick={this.breweryInfo.bind(this,brewery)} >
        {brewery.name}
      </IonItem>
      )
    });

    var beers = this.props.location.state.beers.map(beer => {
      let img = null;
      if(beer.labels !== undefined){
          img = <img src={beer.labels.large}/>
          avatar = true;
      }
      return (
        <IonItem avatar key={beer.id} iconRight onClick={this.beerInfo.bind(this,beer)}>
        {img}
        {beer.name}
      </IonItem>
     )
    })

    return (
      <IonContent customClasses=""
                  {...this.props}>
      <IonList>
        <IonItem divider>Brewery</IonItem>
          {breweries.length > 0 ? breweries : <IonItem > There's no breweries by this search</IonItem>}
        <IonItem divider>Beers</IonItem>
        {beers.length > 0 ? beers : <IonItem > There's no beers available</IonItem>}
      </IonList>


      </IonContent>
    );
  }
});

export default Search;

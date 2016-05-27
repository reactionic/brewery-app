import React from 'react';
import { Meteor } from 'meteor/meteor'; //we import meteor package to call the server
import { IonContent, IonButton } from 'reactionic';
import Label from './brewery/UI/label';
import Section from './brewery/UI/section'
import Input from './brewery/UI/input'
import Message from './brewery/UI/message';
import IonImage from './ionic/IonImage';

const styles = require('./index.scss'); //we require the index css


var Index = React.createClass({
  propTypes: {
    ionSetTransitionDirection: React.PropTypes.func
  },
  contextTypes:{
    router: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      ionSetTransitionDirection: null
    };
  },
  getInitialState:function(){
    return {
      q: '',
      result: null
    }
  },

  handleSearch:function() {
    const that = this;
    if(this.state.q === ''){
      //if the search is null, we show a message
      this.setState({
        result: <Message text="You have to search something" time={5000} />
      });

      return;
    }
    //we call the server and pass the query param

    Meteor.call('search', this.state.q, function(err, response){
      that.handleResponse(response.data);
    });

  },
  handleResponse:function(json){

    if(json.data === undefined){
      this.setState({
        result: <Message text="No results found. Try again with another beer" time={5000} />,
        q: ''
      });
    }
    else {
      //We differ breweries from beers and we passed
      //to the location state object

      let breweries = [];
      let beers     = [];

      json.data
          .filter(item => item.type === 'brewery')
          .map(brewery => breweries.push(brewery))

      json.data
               .filter(item => item.type === 'beer')
               .filter(item => item.labels !== undefined)
              .map(beer => beers.push(beer))

      this.context.router.push({
        pathname: '/search',
        state:{
          breweries: breweries,
          beers: beers
        }
      });

    }
  },
  render:function() {

    return (
      <IonContent customClasses=""
                  {...this.props}>
        <IonImage URL="images/beer.jpg" background>
          <Section align="centered">
              <Label customClasses="search__text">
                Search your beer
              </Label>
            <Section customClasses="margin--section--index">
              <Input customClasses="search__input"
                     defaultValue={this.state.q}
                     onChange={ (e) => { this.setState( { q: e.target.value } ) } }/>
            </Section>
            <IonButton icon="ion-ios-search"
                       iconPosition="left"
                       size="large"
                       color="dark"
                       onClick={this.handleSearch}>GO AHEAD</IonButton>
            <Section customClasses="margin--section--index">
              {this.state.result}
            </Section>
          </Section>
        </IonImage>
      </IonContent>
    );
  }
});

export default Index;

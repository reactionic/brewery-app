import React from 'react';
import { IonContent, IonIcon, IonButton } from 'reactionic';
import Label from './brewery/UI/label';
import Section from './brewery/UI/section'
import Input from './brewery/UI/input'
import Message from './brewery/UI/message';
import IonImage from './ionic/IonImage';
import { Meteor } from 'meteor/meteor';

const styles = require('./index.scss');


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
      this.setState({
        result: <Message text="You have to search something" />
      });
      return;
    }
    Meteor.call('search', this.state.q, function(err, response){
      that.handleResponse(response.data);
    });

  },
  handleResponse:function(json){
    console.log('JSON',json);
    if(json.data === undefined){
      this.setState({
        result: <Message text="No results found. Try again with another beer" />,
        q: ''
      });
    }
    else {
      //We differ breweries from beers and we passed to the location state prop of our next route

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

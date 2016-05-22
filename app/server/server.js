import './imports/publish';
import './imports/version';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'; //to add this package in command line meteor add http

import { API, API_KEY } from './API'; // we import our API URL and API_KEY

//We make the ajax calls from the server.
//The API does not support CORS

Meteor.methods({
  search:function (q) {
    var URL = API + 'search/?key='+API_KEY+"&q="+q;
    return HTTP.call( 'GET', URL);
  }
});

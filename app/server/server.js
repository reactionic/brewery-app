import './imports/publish';
import './imports/version';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import { API, API_KEY } from './API';

Meteor.methods({
  search:function (q) {
    var URL = API + 'search/?key='+API_KEY+"&q="+q;
    return HTTP.call( 'GET', URL);
  }
});

import ReactDOM from 'react-dom';
import React from 'react';
import _ from 'lodash';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './imports/components/app.jsx';
import Layout from './imports/components/layouts/main.jsx';
import NoMatch from './imports/components/nomatch.jsx';
import Index from './imports/components/index.jsx';
import Search from './imports/components/search.jsx';



var main = function () {
  var pageList = [
    { path:'/', component:Index, title:'Brewery Demo'},
    { path:'/search', component:Search, title:'Search - Brewery Demo '}
  ];

  var tabRoutes;
  const pageRoutes = pageList.map(function(page) {
    if(page.childRoutes) {
      tabRoutes = page.childRoutes.map(function(cpage) {
        return <Route path={cpage.path} component={cpage.component} key={cpage.path} />;
      });
    } else {
      return <Route path={page.path} component={page.component} key={page.path} />;
    }
  });

  var PageList = pageList.map(function(page, idx, pageArray) {
    // strip the page components
    delete page.component;
    return page;
  });

  let mainRoute = (
    <Route component={Layout}>
      <IndexRoute component={Index} />
      {pageRoutes}
    </Route>
  );
  let tabRoute = null;
  try {
    tabRoute = (
    <Route path="/tabs" component={Tabs}>
      <IndexRoute component={TabsOne} />
      {tabRoutes}
    </Route>
  );
  } catch(e){
    console.log(e);
  }


  var routes = (
    <Route path="/" component={App} pageList={PageList}>
      { mainRoute }
      {tabRoute }
      <Route path="*" component={NoMatch}/>
    </Route>
  );

  ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app')) ;
};

if (typeof Meteor !== 'undefined') {
  Meteor.startup(function(){
    if (Meteor.isCordova) {
      //need this to prevent the app to scroll when the keyboard appears

      cordova.plugins.Keyboard.disableScroll(true);
      main()
    } else {
      main()
    }

  });

} else {
  main();
}

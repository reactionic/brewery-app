import React from 'react';
import { Link } from "react-router";
import _ from 'lodash';
import { IonNavView, IonView, IonContent, IonNavBar, IonNavBackButton, IonFooterBar, IonButton, IonIcon,
         IonSideMenuContainer, IonSideMenus, IonSideMenu, IonSideMenuContent, IonPopoverButton } from 'reactionic';

var Layout = React.createClass({
  contextTypes: {
    ionSnapper: React.PropTypes.object,
    ionShowPopover: React.PropTypes.func,
    ionPlatform: React.PropTypes.object
  },
  getPageProps: function(path) {

    var backButton = (
      <IonNavBackButton icon="ion-ios-arrow-back"
                        color=""
                        type="clear"
                        history={this.props.history}
                        customClasses="button-stage"
      />
    );

    // add defaults to pageListItems
    var pageList = this.props.pageList.map(function(page) {
      page.headerTitle = page.title;
      page.rightHeaderButton = null;
      page.leftHeaderButton = backButton;
      return page
    });

    var pageProps = _.keyBy(pageList, 'path');

    // custom pageProps
    pageProps['/'].leftHeaderButton=null;


    return pageProps[path];
  },
  render() {
    var currentPageProps = this.getPageProps(this.props.location.pathname);

    return (
        <div>
          <IonNavBar customClasses=""
                     title={currentPageProps.headerTitle}
                     leftButton={currentPageProps.leftHeaderButton}
                     rightButton={currentPageProps.rightHeaderButton}
                     {...this.props}
          />

          <IonNavView customClasses="" {...this.props}>
            <IonView customClasses="" {...this.props}>
              {React.cloneElement(this.props.children, { pageList: this.props.pageList })}
            </IonView>
          </IonNavView>
        </div>
    );
  }
});

export default Layout;

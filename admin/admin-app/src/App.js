import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import './App.css';
import TabsView from './TabsView';
import IntroView from './IntroView';
import HtmlView from './HtmlView';

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <TabsView></TabsView>
        <Route exact path="/" component={IntroView} />
        <Route path="/html" component={HtmlView} />
      </div>
    );
  }
}

export default App;

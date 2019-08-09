import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import './App-global.css';
import TabsView from './TabsView';
import IntroView from './IntroView';
import HtmlView from './HtmlView';
import CssView from './CssView';
import JavascriptView from './JavascriptView';
import ProxyView from './ProxyView';
import SettingsView from './SettingsView';
import MonitorView from './MonitorView';

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <Route path="/" component={TabsView} />
        <Route exact path="/" component={IntroView} />
        <Route path="/html" component={HtmlView} />
        <Route path="/css" component={CssView} />
        <Route path="/javascript" component={JavascriptView} />
        <Route path="/proxy" component={ProxyView} />
        <Route path="/settings" component={SettingsView} />
        <Route path="/monitor" component={MonitorView} />
      </div>
    );
  }
}

export default App;

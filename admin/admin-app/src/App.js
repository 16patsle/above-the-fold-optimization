import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import './App-global.css';
import './App-mobile.css';
import TabsView from './views/TabsView';
import IntroView from './views/IntroView';
import HtmlView from './views/HtmlView';
import CssView from './views/CssView';
import JavascriptView from './views/JavascriptView';
import CriticalCssView from './views/CriticalCssView';
import PwaView from './views/PwaView';
import Http2View from './views/Http2View';
import ProxyView from './views/ProxyView';
import SettingsView from './views/SettingsView';
import MonitorView from './views/MonitorView';

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <Route path="/" component={TabsView} />
        <Route exact path="/" component={IntroView} />
        <Route path="/html" component={HtmlView} />
        <Route path="/css" component={CssView} />
        <Route path="/javascript" component={JavascriptView} />
        <Route path="/criticalcss" component={CriticalCssView} />
        <Route path="/pwa" component={PwaView} />
        <Route path="/http2" component={Http2View} />
        <Route path="/proxy" component={ProxyView} />
        <Route path="/settings" component={SettingsView} />
        <Route path="/monitor" component={MonitorView} />
      </div>
    );
  }
}

export default App;

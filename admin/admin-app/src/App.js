import React, { Component, Suspense } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import './App-global.css';
import './App-mobile.css';
import Loading from './components/Loading';
import TabsView from './views/TabsView';

const IntroView = React.lazy(() => import('./views/IntroView'));
const HtmlView = React.lazy(() => import('./views/HtmlView'));
const CssView = React.lazy(() => import('./views/CssView'));
const JavascriptView = React.lazy(() => import('./views/JavascriptView'));
const CriticalCssView = React.lazy(() => import('./views/CriticalCssView'));
const PwaView = React.lazy(() => import('./views/PwaView'));
const Http2View = React.lazy(() => import('./views/Http2View'));
const ProxyView = React.lazy(() => import('./views/ProxyView'));
const SettingsView = React.lazy(() => import('./views/SettingsView'));
const MonitorView = React.lazy(() => import('./views/MonitorView'));
const BuildToolView = React.lazy(() => import('./views/BuildToolView'));

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <Route path="/" component={TabsView} />
        <Suspense fallback={<Loading />}>
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

          <Route path="/build-tool" component={BuildToolView} />
        </Suspense>
      </div>
    );
  }
}

export default App;

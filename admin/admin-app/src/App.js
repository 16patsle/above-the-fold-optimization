import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';
import './App.css';
import TabsView from './TabsView';

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <TabsView></TabsView>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';
import './App.css';
import TabsView from './TabsView';

window.reactDir = document.querySelector('#reactDir').value
window.homeUrl = document.querySelector('#homeUrl').value
window.adminUrl = document.querySelector('#adminUrl').value

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

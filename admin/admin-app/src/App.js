import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';
import logo from './logo.svg';
import './App.css';
import Tabs from './Tabs';

window.react_dir = document.querySelector('#react_dir').value
window.home_url = document.querySelector('#home_url').value
window.admin_url = document.querySelector('#admin_url').value

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>{__('Page Speed Optimization')}</h1>
        <Tabs></Tabs>
      </div>
    );
  }
}

export default App;

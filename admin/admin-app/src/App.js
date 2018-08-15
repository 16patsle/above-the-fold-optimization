import React, { Component } from 'react';
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
        <header className="App-header">
          <img src={window.react_dir + logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Tabs></Tabs>
      </div>
    );
  }
}

export default App;

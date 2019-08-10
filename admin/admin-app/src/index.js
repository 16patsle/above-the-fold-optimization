import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

window.reactDir = document.querySelector('#reactDir').value;
window.homeUrl = document.querySelector('#homeUrl').value;
window.adminUrl = document.querySelector('#adminUrl').value;
window.abtfAdminNonce = document.querySelector('#abtf_admin_nonce').innerHTML;
window.siteTitle = '‹' + document.title.split('‹')[1];

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

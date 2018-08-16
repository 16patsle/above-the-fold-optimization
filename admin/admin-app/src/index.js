import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

window.reactDir = document.querySelector('#reactDir').value
window.homeUrl = document.querySelector('#homeUrl').value
window.adminUrl = document.querySelector('#adminUrl').value

ReactDOM.render(<App />, document.getElementById('root'));

if (document.getElementById('intro-root')) {
    import('./IntroView').then(IntroView => {
        ReactDOM.render(<IntroView />, document.getElementById('intro-root'));
    })
}
if (document.getElementById('html-root')) {
    import(`./HtmlView`).then(HtmlView => {
        ReactDOM.render(<HtmlView />, document.getElementById('html-root'));
    })
}
//registerServiceWorker();

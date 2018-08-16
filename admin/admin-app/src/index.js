import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

if (document.getElementById('intro-root')) {
    import('./IntroView').then(IntroView => {
        ReactDOM.render(<IntroView />, document.getElementById('intro-root'));
    })
}
//registerServiceWorker();

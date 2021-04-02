import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loading from './components/Loading';
//import registerServiceWorker from './registerServiceWorker';

const HashRouter = React.lazy(() => import('react-router-dom/HashRouter'));
const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <HashRouter>
      <App />
    </HashRouter>
  </Suspense>,
  document.getElementById('root')
);

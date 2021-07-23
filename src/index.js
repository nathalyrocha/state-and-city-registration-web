import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import Navbar from './components/navbar';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Navbar />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

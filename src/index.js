import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Player from './Player';
import reportWebVitals from './reportWebVitals';

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const root = ReactDOM.createRoot(document.getElementById('root'));

if (Object.keys(params).includes('mode') && params['mode'] === 'player') {
  root.render(
    <React.StrictMode>
      <Player />
    </React.StrictMode>
  );  
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );  
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

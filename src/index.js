import React from 'react';
import ReactDOM from 'react-dom/client';
import App  from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //this code cause useEffect to execute twice
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
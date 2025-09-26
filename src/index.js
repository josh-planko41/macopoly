import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function HomePageTitle() {
  return (
    <h1 className="greeting"> Welcome to Macopoly!</h1>
  );
}

function HomePageDescription() {
  return (
    <p className="description"> This is the home page for our project for <i>COMP225</i>, Fall 2025.
    Created by Josh, Chenhao, Bavo, and Colin.</p>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HomePageTitle />
    <HomePageDescription />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

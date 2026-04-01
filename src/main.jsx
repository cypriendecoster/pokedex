import React from 'react';
import ReactDOM from "react-dom/client";
import { FavoritesProvider } from "./context/FavoritesContext";
import Router from "./router";
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </Router>
  </React.StrictMode>
);


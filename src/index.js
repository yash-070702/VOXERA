import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./Redux/rootReducer";
import SettingsProvider from "./contexts/SettingsContext";
import { Provider } from "react-redux";
import {Toaster} from "react-hot-toast";
import { configureStore } from "@reduxjs/toolkit";
const store=configureStore({
  reducer:rootReducer,

})
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        {" "}
        <SettingsProvider>
          <BrowserRouter>
            <App />
            <Toaster/>
          </BrowserRouter>
        </SettingsProvider>
      </Provider>
    </HelmetProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

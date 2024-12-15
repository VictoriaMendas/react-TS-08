import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import "modern-normalize";
import { Provider } from "react-redux";
import { store } from "/src/redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { persistor } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

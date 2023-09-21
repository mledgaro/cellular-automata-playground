import React from "react";
import ReactDOM from "react-dom/client";
import "src/css/index.css";
import App from "src/App";
import { Provider } from "react-redux";
import { store } from "src/app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import InfoPage from "./components/InfoPage.jsx";
import "./styles.css";

const infoRoute = window.location.pathname.match(/^\/(acerca|contacto|privacidad|legales|origen-datos)\/?$/);
const infoPage = infoRoute ? infoRoute[1] : null;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {infoPage ? <InfoPage page={infoPage} /> : <App />}
  </React.StrictMode>,
);

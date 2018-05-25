import routes from "./config/routes";
import { render } from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(registration => {
      console.log("SW registered: ", registration); //eslint-disable-line
    }).catch(registrationError => {
      console.log("SW registration failed: ", registrationError); //eslint-disable-line
    });
  });
}

render(routes, document.getElementById("app"));

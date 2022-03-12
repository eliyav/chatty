import ReactDOM from "react-dom";
import { App } from "./app";
import "./styles/index.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);

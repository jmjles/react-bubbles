import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Bubbles from "./components/BubblePage";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [storage, setStorage] = useState(window.localStorage.getItem("key"));
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Login {...props} setStorage={setStorage} />}
          />
          <PrivateRoute path="/bubbles"
          storage={storage} setStorage={setStorage}
          component={Bubbles}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

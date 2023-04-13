
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Posts from "./views/Posts";
import { ROUTES } from "./constants/routes";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.SIGN_IN} exact component={SignIn} />
        <Route path={ROUTES.SIGN_UP} exact component={SignUp} />
        <Route path={ROUTES.POSTS} exact component={Posts} />
      </Switch>
    </Router>
  );
};

export default App;
import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import notfound from "./components/notfound";
// import login from "./pages/login"

const login = React.lazy(() => import("./pages/login"));
const register = React.lazy(() => import("./pages/register"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          {/* <ul>
          <li><Link to="/login">Go to login</Link></li>
        </ul> */}
          <Switch>
            <Redirect exact from="/" to="/register" />
            <Route path="/register" component={register} />
            <Route path="/login" component={login} />
            <Route component={notfound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

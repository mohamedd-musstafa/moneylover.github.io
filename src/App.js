import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import notfound from "./components/notfound";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const MainTransaction = React.lazy(() => import("./pages/MainTransaction"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          {/* <ul>
          <li><Link to="/login">Go to login</Link></li>
        </ul> */}
          <Switch>
            <Redirect exact from="/" to="/Login" />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/MainTransaction" component={MainTransaction} />
            <Route component={notfound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

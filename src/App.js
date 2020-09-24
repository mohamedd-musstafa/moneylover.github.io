import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Loadingpage from "./components/loading";
import notfound from "./components/notfound";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const MainTransaction = React.lazy(() => import("./pages/MainTransaction"));

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div>
            {" "}
            <Loadingpage />
          </div>
        }
      >
        <BrowserRouter>
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

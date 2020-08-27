import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import notfound from "./components/notfound";
// import login from "./pages/login"

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          {/* <ul>
          <li><Link to="/login">Go to login</Link></li>
        </ul> */}
          <Switch>
            <Redirect exact from="/" to="/Register" />
            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route component={notfound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

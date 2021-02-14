import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Beginning from '../pages/Beginning';

const App=()=>{
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/beginning" component={Beginning}/>
      </Switch>
    </BrowserRouter>
  );
}


export default App;

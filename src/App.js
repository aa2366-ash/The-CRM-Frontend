import React from "react";
import "./App.css";
import LoggedIn from "./Page/LoggedIn";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import LoggedOut from "./Page/LoggedOut";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Contacts from "./Components/Contacts";
import Leads from "./Components/Leads";
import Service from "./Components/Service";
import Dashboard from "./Components/Dashboard";
import AllowAccess from './Components/AllowAccess'

function App({currentUser}) {
  return (
    <>
      <Switch>
        <Route exact path="/login">
          { currentUser === null?  <LoggedOut LoginOrRegister={Login} />  : <Redirect to="/"> </Redirect> } 
        </Route>
        <Route exact path="/Register">
        { currentUser === null?  <LoggedOut LoginOrRegister={Register} />  : <Redirect to="/"> </Redirect> } 
        </Route>
        <Route path="/contacts">
          { currentUser !== null? <LoggedIn Component={Contacts} />  : <Redirect to="/login"> </Redirect> } 
        </Route>
        <Route path="/service">
          { currentUser !== null? <LoggedIn Component={Service} />  : <Redirect to="/login"> </Redirect> } 
        </Route>
        <Route path="/Leads">
          { currentUser !== null? <LoggedIn Component={Leads} />  : <Redirect to="/login"> </Redirect> } 
        </Route>
        <Route path="/access">
          { currentUser !== null? <LoggedIn Component={AllowAccess} />  : <Redirect to="/login"> </Redirect> } 
        </Route>
        <Route path="/" exact>
          { currentUser !== null? <LoggedIn Component={Dashboard} />  : <Redirect to="/login"> </Redirect> } 
        </Route>
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(App);

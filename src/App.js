import "./App.css";
import ListProjects from "./components/ListProjects";
import AddProject from "./components/AddProject";
import Navbar from "./components/Navbar";
import ProjectDetail from "./components/ProjectDetail";
import UpdateProject from "./components/UpdateProject";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import { loggedIn } from "./api";
import React from "react";
import PrivateRoute from "./components/PrivateRoute";

//testing an update to make gitHub work

class App extends React.Component {
  state = {
    loggedInUser: null,
  };
  setLoggedInUser = (user) => {
    this.setState({
      loggedInUser: user,
    });
  };
  //In case the page is refreshed I check if there's
  //an active session on the backend
  async componentDidMount() {
    const response = await loggedIn();
    if (!this.state.loggedInUser) {
      if (response.data._id) {
        this.setLoggedInUser(response.data);
      }
    }
  }
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Navbar
          loggedInUser={this.state.loggedInUser}
          setLoggedInUser={this.setLoggedInUser}
        />
        <Switch>
          <Route exact path={["/", "/projects"]} component={ListProjects} />
          <PrivateRoute exact path="/projects/add" component={PrivateRoute} />
          <Route exact path="/projects/add" component={AddProject} />
          <Route exact path="/projects/:id" component={ProjectDetail} />
          <Route exact path="/projects/:id/edit" component={UpdateProject} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/login"
            render={(props) => {
              return (
                <Login {...props} setLoggedInUser={this.setLoggedInUser} />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
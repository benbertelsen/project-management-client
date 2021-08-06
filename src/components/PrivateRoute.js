
//We do a private route which is, what it says. A route that is private only to privelidge users.
//IT will recieve a component as a property, and returns another component

//PURPOSE is to

import React from "react";
import { loggedIn } from "../api";
import { Route, Redirect } from "react-router-dom";

//High order component
class PrivateRoute extends React.Component {
  state = {
    isLoading: true,
    isLoggedIn: false,
    //isLoading is just because it takes some time, so it's for the program to check
};

    //...if the user is seen as loggedIn, then ew can set the isloading as false because we know it's over (the user is in)
  async componentDidMount() {
    const response = await loggedIn();
    if (response.data._id) {
    //say we want to add a role in addtion to being logged in wwe woudl add && response.data.role == in the above parenthesis...
    //...so continue the if (rseponse.data._id && respones.data...)

      this.setState({
        isLoading: false,
        isLoggedIn: true,
      });
    } else {
      this.setState({
        isLoading: false,
        isLoggedIn: false,
      });
    }
  }

  render() {
    const { isLoggedIn, isLoading } = this.state;
    const { path, exact, component } = this.props;
    return isLoading ? null : isLoggedIn ? (
      <Route path={path} component={component} exact={exact} />
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default PrivateRoute;

//As always, remember to import in App.js, and set path down in the render()
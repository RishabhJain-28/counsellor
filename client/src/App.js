import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LandingPage from "./Pages/LandingPage";
import VideoCall from "./Pages/VideoCall";

import "materialize-css/dist/css/materialize.min.css";

const App = () => {
	return (
		<Router>
			<Fragment>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/videoCall" component={VideoCall} />
				</Switch>
			</Fragment>
		</Router>
	);
};

export default App;
// Color Theme:- https://coolors.co/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d

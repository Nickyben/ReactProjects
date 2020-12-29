import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, useParams, useRouteMatch, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function PrivateRoute({ children, ...rest }) {
	const isAuthenticated = true; //check for auth eg. in redux

	return (
		<Route
			
			{...rest}
			render={({ location }) => {
				return !!isAuthenticated? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				);
			}}
		/>
	);
}

export default PrivateRoute;

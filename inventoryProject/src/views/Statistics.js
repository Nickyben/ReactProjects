import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';

const Page = () => {
	const { page } = useParams();

	return (
		<div>
			<h1>{page}</h1>
		</div>
	);
};
function Statistics() {
	const { url, path } = useRouteMatch();

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light ">
				<div className="container">
					<Link className="navbar-brand" to={`${url}`}>
						Statistics
					</Link>
					<ul className=" navbar-nav ml-auto">
						<li>
							<Link to={`${url}/general-overview`}>General Overview</Link>
						</li>
						<li>
							<Link to={`${url}/finance`}>Finance</Link>
						</li>
					</ul>
				</div>
			</nav>

			<Switch>
				<Route path={`${path}/:page`}>
					<Page />
				</Route>
				<Route exact path={path}>
					<p>Please choose a page</p>
				</Route>
			</Switch>
		</div>
	);
}

export default Statistics;

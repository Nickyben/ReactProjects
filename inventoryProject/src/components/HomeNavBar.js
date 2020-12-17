import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function HomeNavBar({url}) {
	return (
		<div className="top-navbar">
			<nav className="navbar navbar-expand-lg navbar-light fixed-top no-shadow">
				<div className="container">
					<Link className="navbar-brand" to={'/home'}>
						Lanepact Inventory
					</Link>
					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<ul className="navbar-nav ">
							<li className="nav-item">
								<Link className="nav-link" to={`${url}/search`}>
									Search
								</Link>
							</li>
						</ul>
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link className="nav-link" to={'/login'}>
									Logout
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default HomeNavBar;

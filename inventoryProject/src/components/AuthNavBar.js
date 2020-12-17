import React, { Component } from 'react';
import { Link } from 'react-router-dom';



function AuthNavBar() {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light fixed-top">
				<div className="container">
					<Link className="navbar-brand" to={'/login'}>
						Inventory Management
					</Link>
					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link className="nav-link" to={'/login'}>
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to={'/signUp'}>
									Sign up
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default AuthNavBar
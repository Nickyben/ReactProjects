import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function PageHeader({ title, titleLink }) {
	return (
		<div
			className="subnavbar"
			style={{
				top:56,
				width: '100%',
				marginBottom:56,
				position:"fixed",
				zIndex:500,
       	borderTopWidth: 1,
				borderLeftWidth: 1,
				borderTopColor: '#ddd',
        borderLeftColor: '#eee',
				borderTopStyle: 'solid',
				borderLeftStyle: 'solid',
			}}>
			<nav className="navbar navbar-expand-lg navbar-light" >
				<div className="container">
					<Link className="navbar-brand" to={`${titleLink}`}>
						{title}
					</Link>
					{/* <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
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
				 */}
				</div>
			</nav>
		</div>
	);
}

export default PageHeader;

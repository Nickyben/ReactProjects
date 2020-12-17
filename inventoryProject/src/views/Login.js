import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, useParams, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AuthNavBar from '../components/AuthNavBar';

const Login = () => {
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);

	const { state } = useLocation();

	const authenticate = () => {
		// fakeAuth.authenticate(() => {
		// 	setRedirectToReferrer(true);
		// });
	};

	if (redirectToReferrer === true) {
		return <Redirect to={state?.from || '/'} />;
	}

	return (
		<div className="page-wrapper">
			<AuthNavBar />
			<div className="auth-wrapper">
				<div className="auth-inner">
					<form>
						<h3 className={'auth-title'}>Login</h3>
						<div className="form-group">
							<label>Email address</label>
							<input type="email" className="form-control" placeholder="Enter email" />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" placeholder="Enter password" />
						</div>
						<div className="form-group">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="customCheck1" />
								<label className="custom-control-label" htmlFor="customCheck1">
									Remember me
								</label>
							</div>
						</div>
						<Button className="btn btn-primary btn-block" onClick={authenticate}>
							Login
						</Button>
						<p className="forgot-password text-right">
							Forgot <Link to={'/forgot-password'}>password</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;

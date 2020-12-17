import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AuthNavBar from '../components/AuthNavBar';

const SignUp = () => {
	return (
		<div className="page-wrapper">
			<AuthNavBar />
			<div className="auth-wrapper">
				<div className="auth-inner">
					<form>
						<h3 className={'auth-title'}>Signup</h3>
						<div className="form-group">
							<label>First name</label>
							<input type="text" className="form-control" placeholder="first name" />
						</div>
						<div className="form-group">
							<label>Last name</label>
							<input type="text" className="form-control" placeholder="last name" />
						</div>
						<div className="form-group">
							<label>Email address</label>
							<input type="email" className="form-control" placeholder="enter email" />
						</div>
						<div className="form-group">
							<label>Business name</label>
							<input type="email" className="form-control" placeholder=" your business name" />
						</div>
						<div className="form-group">
							<label>Phone number</label>
							<input type="email" className="form-control" placeholder="phone number" />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" placeholder="Enter password" />
						</div>
						<Button className="btn btn-primary btn-block" onClick={() => {}}>
							Signup
						</Button>
						<p className="forgot-password text-right">
							Already registered
							<Link to={'/login'}> sign-in</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;

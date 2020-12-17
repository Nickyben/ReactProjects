import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import AuthNavBar from '../components/AuthNavBar';

const ForgotPassword = () => {
	return (
		<div className="page-wrapper">
			<AuthNavBar />
			<div className="auth-wrapper">
				<div className="auth-inner">
					<form>
						<h3 className={'auth-title'}>Forgot Password?</h3>
						<div className="form-group">
							<label>Email address</label>
							<input type="email" className="form-control" placeholder="Enter email" />
						</div>
						<Button className="btn btn-primary btn-block" onClick={() => {}}>
							Send Email
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;

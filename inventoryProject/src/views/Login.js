import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, useParams, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AuthNavBar from '../components/AuthNavBar';
import FormInput from '../components/UI/Input';
import Form from '../components/UI/Form';

const Login = () => {
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);

	const { state } = useLocation();

	const authHandler = (inputValues, location, history) => {
		//this is for testing
		const to = '/home';
		if (location.pathname !== to) {
			history.push(to);
		}

		console.log(inputValues);
		//...code the authentication here
		// fakeAuth.authenticate(() => {
		// 	setRedirectToReferrer(true);
		// });
	};

	if (redirectToReferrer === true) {
		return <Redirect to={state?.from || '/'} />;
	}
	const loginInputItems = [
		{
			id: 'loginEmail',
			label: 'Email',
			placeholder: 'email address',
			type: 'email',
				required: true,
			className: 'form-control',
			icon: {
				iconName: 'person',
			},
			email: true,
			errorMsg: 'Please provide a valid email address',
		},
		{
			id: 'loginPassword',
			label: 'Password',
			placeholder: 'password',
			type: 'password',
				required: true,
			className: 'form-control',
			icon: {
				iconName: 'lock',
			},
			password: true,
			errorMsg: 'Password must be at least 7 characters.',
		},
		{
			id: 'loginRememberMe',
			type: 'checkbox',
			hideLabel: true,
			hideFloatingLabel:true,
			showErrorMsg: false,
			initialValue: false,
			initialValidity: true,
			className: 'custom-control-input',
			parentClassName: 'custom-control custom-checkbox',
			ExtraComponent: () => (
				<label className="custom-control-label" htmlFor="loginRememberMe">
					Remember me
				</label>
			),
		},
	];

	return (
		<Route
			render={({ location, history }) => (
				<div className="page-wrapper">
					<AuthNavBar />
					<div className="auth-wrapper">
						<div className="auth-inner">
							<Form
								id={'loginForm'}
								title={'Login'}
								items={loginInputItems}
								submitTitle={'LOGIN'}
								formErrorMsg={'Please provide valid credentials!'}
								doNotClearInputs
								formAction={(inputValues) => authHandler(inputValues, location, history)}>
							</Form>
							<p className="forgot-password text-right">
								Forgot <Link to={'/forgot-password'}>password</Link>
							</p>
						</div>
					</div>
				</div>
			)}
		/>
	);
};

export default Login;

{
	/* <form>
								<h3 className={'auth-title'}>Login</h3>
								<div className="form-group">
									<label>Email address</label>
									<FormInput hideLabel hideFloatingLabel email type="email" className="form-control" placeholder="Enter email" />
								</div>
								<div className="form-group">
									<label>Password</label>
									<FormInput hideLabel hideFloatingLabel password type="password" className="form-control" placeholder="Enter password" />
								</div>
								<div className="form-group">
									<div className="custom-control custom-checkbox">
										<input type="checkbox" className="custom-control-input" id="customCheck1" />
										<label className="custom-control-label" htmlFor="customCheck1">
											Remember me
										</label>
									</div>
								</div>
								<Button
									className="btn btn-primary btn-block"
									onClick={authHandler.bind(this, location, history)}>
									Login
								</Button>
								<p className="forgot-password text-right">
									Forgot <Link to={'/forgot-password'}>password</Link>
								</p>
							</form>
 */
}

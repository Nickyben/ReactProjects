import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Link, Route, useParams, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AuthNavBar from '../components/AuthNavBar';
import Form from '../components/UI/Form';

const SignUp = () => {
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);

	const { state } = useLocation();
		const [formActionDone, setFormActionDone] = useState(false);

	const authHandler = (inputValues, location, history) => {

		alert(Object.values(inputValues));

		setFormActionDone(true);
		setTimeout(() => setFormActionDone(false), 5000);
		//console.log(inputValues);
		// const to = '/home';
		// if (location.pathname !== to) {
		// 	history.push(to);
		// }

	};;

	if (redirectToReferrer === true) {
		return <Redirect to={state?.from || '/'} />;
	}

	const signupInputItems = [
		{
			id: 'signupFirstName',
			label: 'First name',
			placeholder: 'first name',
			type: 'text',
				required: true,
			className: 'form-control',
			icon: {
				iconName: 'person',
			},
		},
		{
			id: 'signupLastName',
			label: 'Last name',
			placeholder: 'last name',
			type: 'text',
				required: true,
			className: 'form-control',
			icon: {
				iconName: 'person',
			},
		},
		{
			id: 'signupEmail',
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
			id: 'signupBusinessName',
			label: 'Business name',
			placeholder: 'your business name',
			type: 'text',
				required: true,
			className: 'form-control',
			icon: {
				iconName: 'person',
			},
		},
		{
			id: 'signupPhoneNumber',
			label: 'Phone number',
			placeholder: 'phone number',
			type: 'number',
				required: true,
			className: 'form-control',
			icon: {
				iconName: 'phone',
			},
			phoneNumber: true,
			errorMsg: 'Please provide a valid 10-digits phone number ',
		},
		{
			id: 'signupPassword1',
			label: 'Password',
			placeholder: 'password',
			type: 'password',
				required: true,
			className: 'form-control',
			icon: {
				iconName: 'lock',
			},
			check: 'confirmPasswordMatch',
			password: true,
			errorMsg: 'Password must be at least 7 characters.',
		},

		{
			id: 'signupPassword2',
			label: 'Confirm Password',
			placeholder: 'confirm password',
			type: 'password',
				required: true,
			className: 'form-control',
			icon: {
				iconName: 'lock',
			},
			check: 'confirmPasswordMatch',
			password: true,
			errorMsg: 'Password must be at least 7 characters.',
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
								id={'signUpForm'}
								title={'Signup'}
								items={signupInputItems}
								submitTitle={'SIGNUP'}
								formErrorMsg={'Please provide valid credentials!'}
								formActionDone={formActionDone}
								formSuccessMsg={`Signup was successful! proceed to login.`}
								specificCheck="confirmPasswordMatch"
								doNotClearInputs
								formAction={(inputValues) => authHandler(inputValues, location, history)}
							/>
							<p className="forgot-password text-right">
								Already registered? <Link to={'/login'}>login</Link>
							</p>
						</div>
					</div>
				</div>
			)}
		/>
	);
};

export default SignUp;

// <div className="auth-wrapper">
// 	<div className="auth-inner">
// 		<form>
// 			<h3 className={'auth-title'}>Signup</h3>
// 			<div className="form-group">
// 				<label>First name</label>
// 				<input type="text" className="form-control" placeholder="first name" />
// 			</div>
// 			<div className="form-group">
// 				<label>Last name</label>
// 				<input type="text" className="form-control" placeholder="last name" />
// 			</div>
// 			<div className="form-group">
// 				<label>Email address</label>
// 				<input type="email" className="form-control" placeholder="enter email" />
// 			</div>
// 			<div className="form-group">
// 				<label>Business name</label>
// 				<input type="email" className="form-control" placeholder=" your business name" />
// 			</div>
// 			<div className="form-group">
// 				<label>Phone number</label>
// 				<input type="email" className="form-control" placeholder="phone number" />
// 			</div>
// 			<div className="form-group">
// 				<label>Password</label>
// 				<input type="password" className="form-control" placeholder="Enter password" />
// 			</div>
// 			<Button className="btn btn-primary btn-block" onClick={() => {}}>
// 				Signup
// 			</Button>
// 			<p className="forgot-password text-right">
// 				Already registered
// 				<Link to={'/login'}> sign-in</Link>
// 			</p>
// 		</form>
// 	</div>
// </div>;

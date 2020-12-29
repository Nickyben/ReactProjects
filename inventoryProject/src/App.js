import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './views/Login';
import SignUp from './views/Signup';
import ForgotPassword from './views/ForgotPassword';
import AddWareHouse from './views/AddWareHouse';
import AddProductCategory from './views/AddProductCategory';
import AddProduct from './views/AddProduct';
import Statistics from './views/Statistics';
import PrivateRoute from './routes/PrivateRoute';
import Home from './views/Home';
import Error from './views/ErrorPage';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/signUp">
					<SignUp />
				</Route>
				<Route path="/forgot-password">
					<ForgotPassword />
				</Route>

				<PrivateRoute path="/home">
					<Home />
				</PrivateRoute>
				<Route path="/">
					<Error/> 
				</Route>
				{/* <Route path="/add-warehouse">
					<AddWareHouse />
				</Route>
				<Route path="/add-product-category">
					<AddProductCategory />
				</Route>
				<Route path="/add-product">
					<AddProduct />
				</Route>
				<Route path="/statistics">
					<Statistics />
				</Route> */}
			</Switch>
		</div>
	);
}

export default App;

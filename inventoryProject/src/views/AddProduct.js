import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, useParams, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';

import Form from '../components/UI/Form';

const addCategoryInputItems = [
	{
		id: 'productName',

		label: 'Product name',
		placeholder: 'product name',
		type: 'text',
		required: true,
		className: 'form-control',
		icon: {
			iconName: 'person',
		},
	},
	{
		id: 'productCategory',
		label: 'Product category',
		required: true,
		SpecialInput: ({ onChange, onBlur, onFocus, id, value }) => (
			<DropdownButton
				alignRight
				title={value ? value : 'Categories'}
				//id="dropdown-menu-align-right"
				id={id}
				onSelect={(e) => onChange({ target: { value: e } })} //{categorySelectHandler}
				onBlur={onBlur}
				onFocus={onFocus}
				inputMode='text'
				defaultValue={'Category'}>
				{productCategories.map((cat, index) => {
					return (
						<Dropdown.Item active={cat === value} key={index} eventKey={cat}>
							{cat}
						</Dropdown.Item>
					);
				})}
				<Dropdown.Divider />
				{/* <Dropdown.Item eventKey="some link">some link</Dropdown.Item> */}
			</DropdownButton>
		),
	},
];

const productCategories = ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4', 'Cat 5', 'Cat 6', 'Cat 7', 'Cat 8'];
const AddProduct = () => {
	const { state } = useLocation();
	const [formActionDone, setFormActionDone] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('');

	const categorySelectHandler = (e) => {
		console.log(e);
		setSelectedCategory(e);
	};

	const addProductHandler = (inputValues, location, history) => {
		//AFTER SUBMITTING THE FORM
		alert(Object.values(inputValues));
		setFormActionDone(true);
		setTimeout(() => setFormActionDone(false), 5000);
	};

	return (
		<Route
			render={({ location, history }) => (
				<div className="auth-wrapper">
					<div className="auth-inner">
						<Form
							id={'addCategoryForm'}
							title={'Add Category'}
							items={addCategoryInputItems}
							submitTitle={'ADD'}
							formErrorMsg={'Please provide valid credentials!'}
							formActionDone={formActionDone}
							formSuccessMsg={'Product has been added Successfully!'}
							formAction={(inputValues) => addProductHandler(inputValues, location, history)}></Form>
					</div>
				</div>
			)}
		/>
	);
};

export default AddProduct;

// <div className="form-group">
// 	<label>Product name</label>
// 	<input type="text" className="form-control" placeholder=" product name" />
// </div>

// <div className="form-group">
// 	<label>Product category</label>

// </div>

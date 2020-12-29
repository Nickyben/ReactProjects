import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, useParams, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import Form from '../components/UI/Form';
import { useState } from 'react';

const addCategoryInputItems = [
	{
		id: 'categoryName',

		label: 'Category name',
		placeholder: 'category name',
		type: 'text',
		required: true,
		className: 'form-control',
		icon: {
			iconName: 'person',
		},
	},
	{
		id: 'categoryDescription',
		label: 'Description',
		placeholder: 'describe category',
		type: 'text',
		required: true,
		className: 'form-control',
		icon: {
			iconName: 'person',
		},
	},
	
];

const AddProductCategory = () => {
		const { state } = useLocation();
		const [formActionDone, setFormActionDone]=useState(false)

		const addCategoryHandler = (inputValues, location, history) => {
	alert(Object.values(inputValues));

			//AFTER SUBMITTING THE FORM
			setFormActionDone(true);
			setTimeout(()=>setFormActionDone(false),5000)
			//console.log(inputValues);
			
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
								formSuccessMsg={'Category has been added Successfully!'}
								formAction={(inputValues) => addCategoryHandler(inputValues, location, history)}></Form>
						</div>
					</div>
				)}
			/>
		);
};

export default AddProductCategory;

// return (
// 		<div className="auth-wrapper">
// 			<div className="auth-inner">
// 				<form>
// 					<h3 className={'auth-title'}>Add Product Category</h3>

// 					<div className="form-group">
// 						<label>Category name</label>
// 						<input type="text" className="form-control" placeholder="category name" />
// 					</div>

// 					<div className="form-group">
// 						<label>Description</label>
// 						<input type="text" className="form-control" placeholder="describe category" />
// 					</div>

// 					<Button className="btn btn-primary btn-block" onClick={() => {}}>
// 						Submit
// 					</Button>
// 				</form>
// 			</div>
// 		</div>
// 	);
import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, useParams, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import Form from '../components/UI/Form';

const addWarehouseInputItems = [
	{
		id: 'warehouseName',

		label: 'Warehouse name',
		placeholder: 'name',
		type: 'text',
		required: true,
		className: 'form-control',
		icon: {
			iconName: 'person',
		},
	},
	{
		id: 'warehouseDescription',
		label: 'Description',
		placeholder: 'describe warehouse',
		type: 'text',
		required: true,
		className: 'form-control',
		icon: {
			iconName: 'person',
		},
	},
	{
		id: 'warehouseLocation',
		label: 'Warehouse location',
		placeholder: 'location',
		type: 'text',
		required: true,
		className: 'form-control',
		icon: {
			iconName: 'person',
		},
	},
];

const AddWareHouse = () => {
	const { state } = useLocation();

	const [formActionDone, setFormActionDone]=useState(false)

		const addWarehouseHandler = (inputValues, location, history) => {
	alert(Object.values(inputValues));

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
							id={'addWarehouseForm'}
							title={'Add Warehouse'}
							items={addWarehouseInputItems}
							submitTitle={'ADD'}
							formErrorMsg={'Please provide valid credentials!'}
							formActionDone={formActionDone}
							formSuccessMsg={'Warehouse has been added Successfully!'}
							doNotClearInputs
							formAction={(inputValues) => addWarehouseHandler(inputValues, location, history)}></Form>
					</div>
				</div>
			)}
		/>
	);
};

export default AddWareHouse;

{
	/* <div className="auth-wrapper">
	<div className="auth-inner">
		<form>
			<h3 className={'auth-title'}>Add Warehouse</h3>
			<div className="form-group">
				<label>Warehouse name</label>
				<input type="text" className="form-control" placeholder="name" />
			</div>
			<div className="form-group">
				<label>Description</label>
				<input type="text" className="form-control" placeholder="describe warehouse" />
			</div>
			<div className="form-group">
				<label>Warehouse location</label>
				<input type="text" className="form-control" placeholder="location" />
			</div>

			<Button className="btn btn-primary btn-block" onClick={() => {}}>
				Submit
			</Button>
		</form>
	</div>
</div>; */
}

import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

const AddWareHouse = () => {
	return (
		<div className="auth-wrapper">
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
		</div>
	);
};

export default AddWareHouse;

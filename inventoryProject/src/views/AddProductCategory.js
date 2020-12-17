import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const AddProductCategory = () => {
	return (
		<div className="auth-wrapper">
			<div className="auth-inner">
				<form>
					<h3 className={'auth-title'}>Add Product Category</h3>

					<div className="form-group">
						<label>Category name</label>
						<input type="text" className="form-control" placeholder="category name" />
					</div>

					<div className="form-group">
						<label>Description</label>
						<input type="text" className="form-control" placeholder="describe category" />
					</div>

					<Button className="btn btn-primary btn-block" onClick={() => {}}>
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

export default AddProductCategory;

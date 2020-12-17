import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';

const productCategories = ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4', 'Cat 5', 'Cat 6', 'Cat 7', 'Cat 8'];
const AddProduct = () => {
	const [selectedCategory, setSelectedCategory] = useState('');

	const categorySelectHandler = (e) => {
		console.log(e);
		setSelectedCategory(e);
	};

	return (
		<div className="auth-wrapper">
			<div className="auth-inner">
				<form>
					<h3 className={'auth-title'}>Add Product</h3>

					<div className="form-group">
						<label>Product name</label>
						<input type="text" className="form-control" placeholder=" product name" />
					</div>

					<div className="form-group">
						<label>Product category</label>
						<DropdownButton
							alignRight
							title={selectedCategory ? selectedCategory : 'Categories'}
							id="dropdown-menu-align-right"
							onSelect={categorySelectHandler}>
							{productCategories.map((cat, index) => {
								return (
									<Dropdown.Item active={cat === selectedCategory} key={index} eventKey={cat}>
										{cat}
									</Dropdown.Item>
								);
							})}
							<Dropdown.Divider />
							<Dropdown.Item eventKey="some link">some link</Dropdown.Item>
						</DropdownButton>
					</div>

					<Button className="btn btn-primary btn-block" onClick={() => {}}>
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

export default AddProduct;

import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled, { css } from 'styled-components';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Auxiliary from '../hoc/Auxiliary';

const styles = {
	card: {
	//	padding: 15,
		marginBottom: 15,
		//margin: 10,
	},
};

const generalItems = [
	{
		title: 'Top Products Purchased',
		subtitle: 'Products bought most',
		image: 'https://www.incimages.com/uploaded_files/image/1920x1080/GettyImages-1158242033_411023.jpg',
	},
	{
		title: 'Top Products Sold',
		subtitle: 'Products sold most',
		image: 'https://q3p9g6n2.rocketcdn.me/wp-content/ml-loads/2014/08/online-shopping-ecommerce-ss-1920.png',
	},
	{
		title: 'Top Clients',
		subtitle: 'Our top clients',
		image: 'https://s3-ap-southeast-1.amazonaws.com/titan-live/Contents/Source/companypurchase.jpg',
	},
];

const Dashboard = ({}) => {
	return (
		<Auxiliary>
			<Container >
				<Row xs={1} sm={2} md={3} >
					{generalItems.map(({ title,image, subtitle}, index) => {
						return (
							<Col key={index}>
								<Card style={styles.card} >
									<Card.Img variant="top" src={image} />
									<Card.Body>
										<Card.Title>{title}</Card.Title>
										<Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
										{/* <Card.Text>
											Some quick example text 	the card's content.
										</Card.Text> */}
										{/* <Card.Link href="#">Card Link</Card.Link>
										<Card.Link href="#">Another Link</Card.Link> */}
										<Button variant="primary">View</Button>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</Auxiliary>
	);
};

export default Dashboard;

import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import HomeNavBar from '../components/HomeNavBar';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Sidebar from '../components/Sidebar';
import './styles/Dashboard.css';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'font-awesome/css/font-awesome.min.css';
import Page from '../components/Page';
import { toTitleCase, dashed } from '../MyFuncs';
import AddProduct from './AddProduct';
import AddWareHouse from './AddWareHouse';
import AddProductCategory from './AddProductCategory';

const homeStructure = [
	{
		id: 'dashboard',
		component: ({}) => <h1>Dashboard</h1>,
		icon: 'table',
		subNav: [
			{ id: 'general', component: ({}) => <h1>General</h1> },
			{ id: 'profit', component: ({}) => <h1>Profit</h1> },
		],
	},
	{
		id: 'inventory',
		component: ({}) => <h1>Inventory</h1>,
		icon: 'archive',
		subNav: [],
	},
	{
		id: 'items',
		component: ({}) => <h1>Items</h1>,
		icon: 'tag',
		subNav: [
			{ id: 'overview', component: ()=><h1>Overview</h1> },
			{ id: 'add store', component: AddWareHouse },
			{ id: 'add category', component: AddProductCategory },
			{ id: 'add product', component: AddProduct },
		],
	},
	{
		id: 'clients',
		component: ({}) => <h1>Clients</h1>,
		icon: 'address-book',
		subNav: [],
	},
];

const styles = {
	toggler: {
		backgroundColor: '#ccc',
		color: 'blue',
	},
	navText: {
		color: '#333',
	},
	subNavText: {
		paddingLeft: 60,
		textAlign: 'left',
		color: '#555',
	},
};
function Home() {
	const { url, path } = useRouteMatch();
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	const sidebarControlled = (isOpen) => {
		setSidebarIsOpen(isOpen);
	};
	return (
		<>
			<HomeNavBar url={url} />
			<div>
				<Route
					render={({ location, history }) => (
						<React.Fragment>
							<SideNav
								style={{
									top: 56,
									bottom: 0,
									backgroundColor: 'white',
								}}
								onToggle={(isOpen) => sidebarControlled(isOpen)}
								onSelect={(selected) => {
									const to = url + '/' + selected;
									if (location.pathname !== to) {
										history.push(to);
									}
								}}>
								<SideNav.Toggle style={styles.toggler} expanded={true} />
								<SideNav.Nav defaultSelected={homeStructure[0].id}>
									{homeStructure.map((page, index) => {
										return (
											<NavItem eventKey={dashed(page.id)}>
												<NavIcon>
													<i
														className={`fa fa-fw fa-${page.icon}`}
														style={{ fontSize: '1.75em', color: '#556677' }}
													/>
												</NavIcon>

												<NavText style={styles.navText}>{toTitleCase(page.id)}</NavText>
												{page.subNav.map((subPage, index) => {
													return (
														<NavItem eventKey={`${dashed(page.id)}/${dashed(subPage.id)}`}>
															<NavText
																style={{ ...styles.navText, ...styles.subNavText }}>
																{toTitleCase(subPage.id)}
															</NavText>
														</NavItem>
													);
												})}
											</NavItem>
										);
									})}
								</SideNav.Nav>
							</SideNav>

							<main style={{ marginTop: 56, marginLeft: sidebarIsOpen ? 240 : 64 }}>
								<Switch>
									<Route exact path={path}>
										<h1>Home</h1>
									</Route>
									<Route path={`${path}/:pageId`}>
										<Page pages={homeStructure} />
									</Route>
								</Switch>
								{/* 
								<Route exact path={path} component={(props) => <h1>home</h1>} />
								<Route path={`${path}/devices`} component={(props) => <h1>devices</h1>} /> */}
							</main>
						</React.Fragment>
					)}
				/>
			</div>
		</>
	);
}

export default Home;

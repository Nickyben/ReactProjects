import React, { useState } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import PageHeader from './PageHeader';
import SubPage from './SubPage';
import Auxiliary from '../hoc/Auxiliary';
import { toTitleCase, unDashed } from '../constants/MyFuncs';

const Page = ({ pages }) => {
	const { url, path } = useRouteMatch();
	const { pageId } = useParams();
	const page = pages.find((p) => p.id === unDashed(pageId));
	const PageComponent = page ? page.component : () => <h1>Page Not Found!</h1>;

	//alert(path)
	return (
		<Auxiliary>
			{page && (
				<>
					<PageHeader title={toTitleCase(page.id)} titleLink={url} />
					<div style={{ marginTop: 132, }}>
						<Switch>
							<Route exact path={url}>
								<PageComponent />
							</Route>
							<Route path={`${url}/:subPageId`}>
								<SubPage subPages={page.subNav} />
							</Route>
						</Switch>
					</div>
				</>
			)}
			{!page && <PageHeader title={toTitleCase(unDashed(pageId))} titleLink={url} />}
		</Auxiliary>
	);
};

export default Page;

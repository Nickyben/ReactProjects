import React, { useState } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import { unDashed } from '../constants/MyFuncs';

const SubPage = ({subPages}) => {
	const { url, path } = useRouteMatch();
  const { subPageId } = useParams();
  const subPage = subPages.find((subP) => subP.id === unDashed(subPageId));
  const PageComponent = subPage ? subPage.component : () => <h1>Page Not Found!</h1>;

	return (
		<div>
			<Switch>
				<Route exact path={url}>
					<PageComponent />
				</Route>
				<Route path={`${url}/:subPageId`}>
					<h1>Page Not Found</h1>
				</Route>
			</Switch>
		</div>
	);
};

export default SubPage;
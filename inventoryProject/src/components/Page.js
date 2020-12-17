import React, { useState } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import PageHeader from './PageHeader';
import SubPage from './SubPage';
import { toTitleCase,unDashed } from '../MyFuncs';



const Page = ({pages}) => {
	const { url, path } = useRouteMatch();
  const { pageId } = useParams();
  const page =  pages.find(p=>p.id === unDashed(pageId))
  const PageComponent =  page ?page.component: ()=><h1>Page Not Found!</h1>

	//alert(path)
	return (
		<div>
			<PageHeader title={toTitleCase(page.id)} titleLink={url} />
			<Switch>
				<Route exact path={url}>
					<PageComponent />
				</Route>
				<Route path={`${url}/:subPageId`}>
					<SubPage subPages={page.subNav}/>
				</Route>
			</Switch>
		</div>
	);
};

export default Page;
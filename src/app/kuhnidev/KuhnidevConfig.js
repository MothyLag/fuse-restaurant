import React from 'react';
// import cardedLayoutRoutes from './page-layouts/carded/cardedLayoutRoutes';
// import simpleLayoutRoutes from './page-layouts/simple/simpleLayoutRoutes';

export default {
	routes: [
		// ...cardedLayoutRoutes,
		// ...simpleLayoutRoutes,
		// {
		// 	path: '/ui/page-layouts/blank',
		// 	component: React.lazy(() => import('./page-layouts/blank'))
		// },
		// {
		// 	path: '/ui/icons',
		// 	component: React.lazy(() => import('./icons/IconsUI'))
		// },
		// {
		// 	path: '/ui/typography',
		// 	component: React.lazy(() => import('./typography/TypographyUI'))
		// },
		{
			path: '/dev/module-operations',
			component: React.lazy(() => import("./module-operations"))
		},
		{
			path: '/dev/right-sidebar-2-tabbed',
			component: React.lazy(() => import("./right-sidebar-2-tabbed"))
		},
	]
};

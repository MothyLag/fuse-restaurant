import React from 'react';
import { Redirect } from 'react-router-dom';

const KuhniAppConfigv3 = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/kunhiapiv3/staff',
			// params: 'Hola',
			component: React.lazy(() => import('./Module')),
			exact: true,
			state: { name: 'staff' }
		},
		{
			path: '/kunhiapiv3/todo',
			// params: 'Hola',
			component: React.lazy(() => import('./Module')),
			exact: true,
			state: { name: 'super-todo' }
		},
		{
			path: '/kunhiapiv3/purchase',
			// params: 'Hola',
			component: React.lazy(() => import('./Module')),
			exact: true,
			state: { name: 'purchase' }
		}
	]
};

export default KuhniAppConfigv3;

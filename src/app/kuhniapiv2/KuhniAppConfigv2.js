import React from 'react';
import { Redirect } from 'react-router-dom';

const KuhniAppConfigv2 = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/kunhiapiv2/staff',
			// params: 'Hola',
			component: React.lazy(() => import('./Module')),
			exact: true,
			state: { name: 'staff' }
		},
		{
			path: '/kunhiapiv2/todo',
			// params: 'Hola',
			component: React.lazy(() => import('./Module')),
			exact: true,
			state: { name: 'super-todo' }
		},
		{
			path: '/kunhiapiv2/purchase',
			// params: 'Hola',
			component: React.lazy(() => import('./Module')),
			exact: true,
			state: { name: 'purchase' }
		}
	]
};

export default KuhniAppConfigv2;

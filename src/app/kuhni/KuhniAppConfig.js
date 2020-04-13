import React from 'react';
import { Redirect } from 'react-router-dom';

const KuhniAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/kunhi/staff',
			// params: 'Hola',
			component: React.lazy(() => import('./Module')),
			exact: true,
			state: { name: 'staff' }
		},
		{
			path: '/kunhi/todo',
			// params: 'Hola',
			component: React.lazy(() => import('./Module')),
			exact: true,
			state: { name: 'super-todo' }
		},
		{
			path: '/kunhi/purchase',
			// params: 'Hola',
			component: React.lazy(() => import('./Module')),
			exact: true,
			state: { name: 'purchase' }
		}
	]
};

export default KuhniAppConfig;

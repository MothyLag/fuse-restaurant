import React from 'react';
import './mesh.css';
import { TableRestaurant } from '../table/table';
export const Mesh = props => {
	let rows = new Array(20);
	for (let i = 0; i < rows.length; i++) {
		rows[i] = new Array(20);
		rows[i].fill('none');
	}
	console.log(rows);
	return (
		<>
			{rows.map((row, index) => (
				<div key={`zoneRow${index}`} className="zone__row">
					{row.map(column => {
						return <TableRestaurant />;
					})}
				</div>
			))}
		</>
	);
};

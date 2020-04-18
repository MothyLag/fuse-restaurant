import React, { useState } from 'react';
import './table.css';
import { Icon } from '@material-ui/core';

export const TableRestaurant = () => {
	const [hovered, setHovered] = useState(false);
	return (
		<div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="table--empty">
			<div style={{ display: hovered ? 'flex' : 'none' }} className="table__content--empty">
				<Icon className="text-white text-50 table__icon">add</Icon>
			</div>
		</div>
	);
};

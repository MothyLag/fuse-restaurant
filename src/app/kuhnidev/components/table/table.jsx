import React, { useState, useEffect } from 'react';
import './table.css';
import { Icon } from '@material-ui/core';

export const TableRestaurant = props => {
	const { table } = props;
	const [hovered, setHovered] = useState(false);
	const [empty, setEmpty] = useState(true);
	useEffect(() => {
		if (table !== 'none') {
			setEmpty(false);
		}
	}, [table]);

	if (empty === false) return <div className="table"></div>;

	return (
		<div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="table--empty">
			<div style={{ display: hovered ? 'flex' : 'none' }} className="table__content--empty">
				<Icon className="text-white text-50 table__icon">add</Icon>
			</div>
		</div>
	);
};

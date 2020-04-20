import React, { useState, useEffect } from 'react';
import './table.css';
import { Icon } from '@material-ui/core';

export const TableRestaurant = props => {
	const { table, onAdd, column, row } = props;
	const [hovered, setHovered] = useState(false);
	const [empty, setEmpty] = useState(true);
	useEffect(() => {
		if (table !== 'none') {
			setEmpty(false);
		}
	}, [table]);

	if (empty === false) return <div className="table">{table.number}</div>;

	return (
		<div
			onClick={() => onAdd(column, row)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className="table--empty"
		>
			<div style={{ display: hovered ? 'flex' : 'none' }} className="table__content--empty">
				<Icon className="text-white text-50 table__icon">add</Icon>
			</div>
		</div>
	);
};

import React, { useState, useEffect } from 'react';
import './table.css';
import { Icon } from '@material-ui/core';

export const TableRestaurant = props => {
	const { table, onAdd, column, row, onEdit } = props;
	const [hovered, setHovered] = useState(false);
	const [empty, setEmpty] = useState(true);
	useEffect(() => {
		if (table !== 'none') {
			setEmpty(false);
		}
	}, [table]);

	// if (empty === false) return <div onClick={()=>onEdit(table)} className="table">{table.number}</div>;

	return (
		<div
			onClick={() => onAdd(column, row)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className="table--empty"
		>
			<div className="table__content--empty">
				{empty ? (
					<Icon style={{ display: hovered ? 'flex' : 'none' }} className="text-white text-50 table__icon">
						add
					</Icon>
				) : (
					<div
						style={{
							width: table.size == 'chica' ? '40px' : '60px',
							height: table.size == 'chica' ? '40px' : '60px',
							borderRadius: table.shape == 'cuadrada' ? 0 : '50%'
						}}
						onClick={() => onEdit(table)}
						className="table"
					>
						{table.number}
					</div>
				)}
			</div>
		</div>
	);
};

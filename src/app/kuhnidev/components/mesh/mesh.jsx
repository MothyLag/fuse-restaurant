import React, { useEffect, useState } from 'react';
import './mesh.css';
import { TableRestaurant } from '../table/table';
export const Mesh = props => {
	const { zone, onAdd } = props;
	let rows = new Array(20);
	for (let i = 0; i < rows.length; i++) {
		rows[i] = new Array(20);
		rows[i].fill('none');
	}
	const [rowsState, setRows] = useState(rows);
	useEffect(() => {
		let auxArray = rowsState.map(item => item);
		if (zone != undefined) {
			zone.fields[0].tables.map(table => {
				auxArray[table.row][table.col] = table;
			});
			setRows(auxArray);
		}
	}, [zone]);
	return (
		<>
			{rowsState.map((row, rowIndex) => (
				<div key={`zoneRow${rowIndex}`} className="zone__row">
					{row.map((column, columnIndex) => {
						return <TableRestaurant onAdd={onAdd} table={column} column={columnIndex} row={rowIndex} />;
					})}
				</div>
			))}
		</>
	);
};

import React, { useState, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
// import Icon from '@material-ui/core/Icon';
// import Chip from '@material-ui/core/Chip';

export default props => {
	const { columns, rows } = props;

	const [currentColumns, setCurrentColumns] = useState(null);

	useEffect(() => {
		if (columns) {
			setCurrentColumns(columns);
		}
	}, [columns]);

	const actualColumns = currentColumns || ['No hay columnas'];

	const [currentRows, setCurrentRows] = useState(null);

	useEffect(() => {
		if (rows) {
			setCurrentRows(rows);
		}
	}, [rows]);

	const actualRows = currentRows || [
		[
			{
				align: 'center',
				render: 'No hay filas'
			}
		]
	];

	return (
		<Table>
			<TableHead>
				<TableRow>
					{actualColumns.map((column, index) => (
						<TableCell key={`column-${index}`}>{column}</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{actualRows.map((cells, index) => (
					<TableRow key={`row-${index}`}>
						{cells.map((cell, index) => {
							const { align, render } = cell;
							return (
								<TableCell
									key={`cell-${index}`}
									colSpan={actualColumns.length - cells.length + 1}
									align={align}
								>
									{render}
								</TableCell>
							);
						})}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

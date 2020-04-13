import React, { useState, useEffect, useContext } from 'react';
import CatalogTable from './CatalogTable';

import { UIContext } from './OperationsModuleTabs';
import { Icon } from '@material-ui/core';

const useOperationRecords = (baseUrl, moduleName, operationName) => {
	const url = `${baseUrl}/api/contracts/v1/contract/${moduleName}/v1/operation/${operationName}/records?username=bot1&token=123`;

	const [error, setError] = useState(null);
	const [records, setRecords] = useState(null);

	useEffect(() => {
		if (operationName) {
			setError(null);
			setRecords(null);
			(async () => {
				const response = await fetch(url);
				if (!response.ok) {
					const error = await response.text();
					setError(error);
					return;
				}
				const records = await response.json();
				setRecords(records);
			})();
		}
	}, [baseUrl, moduleName, operationName]);

	return { records, error };
};

export default props => {
	const { moduleName } = props;

	const { state: uiState, dispatch: uiDispatch } = useContext(UIContext);

	const { selectedTabIndex, selectedTab } = uiState;

	console.log('selectTabData', selectedTab);

	const [columns, setColumns] = useState(null);
	const [columnNames, setColumnNames] = useState(null);
	const [rows, setRows] = useState(null);
	const [ids, setIds] = useState(null);
	const [contract, setContract] = useState(null);

	const baseUrl = 'http://132.148.165.49:6001';

	useEffect(() => {
		if (selectedTab) {
			setContract(selectedTab.name);
			setColumns(selectedTab.fields.map(field => field.label || field.name));
			setColumnNames(selectedTab.fields.map(field => field.name));
		}
	}, [selectedTab]);

	const { records, error: recordsError } = useOperationRecords(baseUrl, moduleName, contract);

	useEffect(() => {
		if (records) {
			console.log('records', records);
			const rows = [];
			const idss = [];
			for (let record of records.results) {
				const cells = [];
				idss.push(record.id);
				for (let columnName of columnNames) {
					const value = record[columnName];

					let render = <span>{value || '-'}</span>;

					const [schema] = selectedTab.fields.filter(field => field.name === columnName);

					if (schema) {
						// console.log('schema', schema);
						if (schema.type === 'boolean') {
							render = value ? (
								<Icon className="text-green text-20">check_circle</Icon>
							) : (
								<Icon className="text-red text-20">remove_circle</Icon>
							);
						}
					}

					cells.push({
						align: 'left',
						render
					});
				}
				rows.push(cells);
			}
			setIds(idss);
			setRows(rows);
		}
	}, [records]);

	return (
		<div className="p-24">
			<CatalogTable
				columns={columns}
				rows={rows}
				ids={ids}
				// handleChangeMode={handleChangeMode}
				// records={records ? records.results : []}
				// handleChangeData={handleChangeData}
			/>
		</div>
	);
};

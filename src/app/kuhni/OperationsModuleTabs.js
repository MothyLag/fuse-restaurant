import React, { useRef, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import FusePageCarded from './FusePageCarded';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';

import DemoContent from '@fuse/core/DemoContent';
import DemoSidebarContent from '@fuse/core/DemoSidebarContent';
import ActionsOperationTabs from './ActionsOperationTabs';
import CatalogTable from './CatalogTable';
import TextField from '@material-ui/core/TextField';
import OperationHeader from './OperationHeader';

const useStyles = makeStyles({
	layoutRoot: {}
});

const useModuleSchema = (baseUrl, moduleName) => {
	const url = `${baseUrl}/api/modules/module/${moduleName}/v1/schema`;

	const [error, setError] = useState(null);
	const [schema, setSchema] = useState(null);

	useEffect(() => {
		setError(null);
		setSchema(null);
		(async () => {
			const response = await fetch(url);
			if (!response.ok) {
				const error = await response.text();
				setError(error);
				return;
			}
			const schema = await response.json();
			setSchema(schema);
		})();
	}, [baseUrl, moduleName]);

	return { schema, error };
};

const useOperationRecords = (baseUrl, moduleName, operationName) => {
	const url = `${baseUrl}/api/modules/module/${moduleName}/v1/operation/${operationName}/records`;

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
	// const baseUrl = "http://192.168.1.104:4001";

	const baseUrl = 'http://132.148.165.49:4001';

	const classes = useStyles();

	const pageLayout = useRef(null);

	const { schema, error: schemaError } = useModuleSchema(baseUrl, moduleName);

	const [operationName, setOperationName] = useState(null);

	const { records, error: recordsError } = useOperationRecords(baseUrl, moduleName, operationName);

	const [tabs, setTabs] = useState([
		{
			label: 'Cargando operaciones...'
		}
	]);

	const [tabsReady, setTabsReady] = useState(false);

	useEffect(() => {
		if (schema) {
			// console.log(schema);
			setTabs(schema.operations);
			setTabsReady(true);
		}
	}, [schema]);

	useEffect(() => {
		if (tabsReady) {
			setSelectedTab(tabs[0]);
		}
	}, [tabsReady]);

	const [selectedTab, setSelectedTab] = useState(null);
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);

	useEffect(() => {
		if (tabsReady) {
			const tab = tabs[selectedTabIndex];
			setSelectedTab(tab);
		}
	}, [selectedTabIndex]);

	const [columns, setColumns] = useState(null);
	const [columnNames, setColumnNames] = useState(null);

	useEffect(() => {
		if (selectedTab) {
			// console.log('selectedTab', selectedTab);
			setOperationName(selectedTab.name);
			setColumns(selectedTab.fields.map(field => field.label || field.name));
			setColumnNames(selectedTab.fields.map(field => field.name));
			setRows(null);
		}
	}, [selectedTab]);

	const [rows, setRows] = useState(null);
	const [ids, setIds] = useState(null);

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

	const newModeFields = selectedTab
		? selectedTab.fields.map((field, index) => {
				const { name, type, required, edit, relation, description } = field;
				let render = <span>no editable</span>;
				if (edit) {
					if (type === 'string') {
						render = (
							<TextField
								className="mt-8 mb-16"
								// error={form.name === ''}
								required={required}
								label={name}
								autoFocus
								id={name}
								name={name}
								// value={form.name}
								// onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
						);
					}
				}
				return (
					<div key={`field-${index}`}>
						<span>{name}</span>
						{render}
					</div>
				);
		  })
		: null;

	const [mode, setMode] = useState('read');
	const [data, setData] = useState(null);

	const handleChangeMode = newMode => {
		// alert('Agrergar nuevo');
		setMode(newMode);
	};

	const handleChangeData = newData => {
		setData(newData);
	};

	return (
		<FusePageCarded
			classes={{
				root: classes.layoutRoot,
				toolbar: 'p-0'
			}}
			header={
				<div className="flex flex-col flex-1">
					<div className="flex items-center py-24">
						<Hidden lgUp>
							<IconButton
								onClick={ev => pageLayout.current.toggleRightSidebar()}
								aria-label="open right sidebar"
							>
								<Icon>menu</Icon>
							</IconButton>
						</Hidden>
						<OperationHeader
							title={moduleName}
							operationName={operationName}
							handleChangeMode={handleChangeMode}
						/>
					</div>
				</div>
			}
			contentToolbar={
				<Tabs
					value={selectedTabIndex}
					onChange={(event, index) => setSelectedTabIndex(index)}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="on"
					className="w-full h-64"
				>
					{tabs.map((tab, index) => {
						const { label } = tab;
						return <Tab key={`tab-${index}`} className="h-64" label={label} />;
					})}
				</Tabs>
			}
			content={
				<div className="p-24">
					<CatalogTable
						columns={columns}
						rows={rows}
						ids={ids}
						handleChangeMode={handleChangeMode}
						records={records ? records.results : []}
						handleChangeData={handleChangeData}
					/>
				</div>
			}
			rightSidebarContent={
				<ActionsOperationTabs
					operationName1={operationName}
					mode={mode}
					handleChangeMode={handleChangeMode}
					data={data}
					moduleName={moduleName}
				/>
			}
			innerScroll
			ref={pageLayout}
		/>
	);
};

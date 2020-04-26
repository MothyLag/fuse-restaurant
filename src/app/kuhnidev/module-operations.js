import React, { useRef, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import FusePageCarded from '@fuse/core/FusePageCarded';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse/core/formsy';

import DemoContent from '@fuse/core/DemoContent';
import DemoSidebarContent from '@fuse/core/DemoSidebarContent';
import { Mesh } from './components/mesh/mesh';
import OneTable from './components/OneTable';

//
import FormEdit from './components/FormEdit/FormEdit';
import Input from './components/input/Input';
//

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
			// const response = await fetch(url);
			// if (!response.ok) {
			if (false) {
				// const error = await response.text();
				setError(error);
				return;
			}
			// const schema = await response.json();
			// setSchema(schema);
			console.log(schema);
			const data = [
				{
					name: 'zona1',
					label: 'zona1',
					collection: 'zona1',
					fields: [
						{
							name: 'zona1',
							tables: [
								{
									number: 1,
									shape: 'redonda',
									size: 'chica',
									col: 1,
									row: 3,
									busy: true,
									group: [1, 2]
								},
								{
									number: 2,
									shape: 'cuadrada',
									size: 'chica',
									col: 1,
									row: 4,
									busy: true,
									group: [1, 2]
								},
								{ number: 3, shape: 'cuadrada', size: 'chica', col: 1, row: 6, busy: false, group: [] }
							]
						}
					]
				},
				{
					name: 'zona2',
					label: 'zona2',
					collection: 'zona2',
					fields: [
						{
							name: 'zona2',
							tables: [
								{ number: 1, shape: 'redonda', size: 'chica', col: 1, row: 3, busy: true, group: [] }
							]
						}
					]
				}
			];

			setSchema(data);
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
			// (async () => {
			// 	const response = await fetch(url);
			// 	if (!response.ok) {
			// 		const error = await response.text();
			// 		setError(error);
			// 		return;
			// 	}
			// 	const records = await response.json();
			// 	setRecords(records);
			// })();
		}
	}, [baseUrl, moduleName, operationName]);

	return { records, error };
};

export default () => {
	// const baseUrl = "http://192.168.1.104:4001";
	const baseUrl = 'http://132.148.165.49:4001';

	const classes = useStyles();

	const pageLayout = useRef(null);

	const { schema, error: schemaError } = useModuleSchema(baseUrl, 'staff');

	const [operationName, setOperationName] = useState(null);

	const { records, error: recordsError } = useOperationRecords(baseUrl, 'staff', operationName);

	const [tabs, setTabs] = useState([
		{
			label: 'Cargando operaciones...'
		}
	]);

	const [tabsReady, setTabsReady] = useState(false);

	const [buttonConfiguration, setButtonConfiguration] = useState(false);
	const [newZone, setNewZone] = useState(false);
	const [newTable, setNewTable] = useState(false);

	useEffect(() => {
		if (schema) {
			console.log(schema);
			// setTabs(schema.operations);
			setTabs(schema);
			setTabsReady(true);
		}
	}, [schema]);

	const addZone = data => {
		const addObject = tabs;
		const newObject = {};

			Object.keys(tabs[0]).map(item => {
				newObject[item] = data.zone;
				newObject.fields = [{ 
					name: data.zone,
					tables: [],
				}];
			});

		addObject.push(newObject);

		setTabs(addObject);
		setTabsReady(true);
		setNewZone(false);
	};

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

	useEffect(() => {
		if (selectedTab) {
			console.log('selectedTab', selectedTab);
			setOperationName(selectedTab.name);
			setColumns(selectedTab.fields.map(field => field.label || field.name));
			setRows(null);
		}
	}, [selectedTab]);

	const [rows, setRows] = useState(null);
	const [tablesChange, setTablesChange] = useState(null);
	useEffect(() => {
		if (records) {
			console.log('records', records);
			const rows = [];
			for (const record of records.results) {
				const cells = [];
				for (const columnName of columns) {
					const value = record[columnName] || '-';

					let render = <span>{value}</span>;

					const [schema] = selectedTab.fields.filter(field => field.name === columnName);

					if (schema) {
						// console.log("schema", schema);
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
			setRows(rows);
		}
	}, [records]);

	const newModeFields = selectedTab
		? selectedTab.fields.map((field, index) => {
				const { name, type, required, edit, relation, description } = field;
				let render = <span>no editable</span>;
				if (edit) {
					if (type === 'string') {
						render = <input required={required} placeholder={name} />;
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
						<div className="flex-1">
							<h4>ZONAS Y MESAS</h4>
						</div>
						<div>
							{buttonConfiguration !== true ? (
								<Button variant="contained" onClick={() => setButtonConfiguration(true)}>
									configurar zonas y mesas
								</Button>
							) : (
								<>
									<Button
										variant="contained"
										onClick={() => {
											setButtonConfiguration(false);
											setNewZone(false);
										}}
										style={{ marginRight: '10px' }}
									>
										cancelar
									</Button>
									<Button
										variant="contained"
										color="secondary"
										onClick={() => {
											setTabsReady(false);
											setNewZone(true);
											setNewTable(false);
										}}
									>
										nueva zona
									</Button>
								</>
							)}
						</div>
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
					scrollButtons="off"
					className="w-full h-64"
				>
					{tabs.map((tab, index) => {
						const { label } = tab;
						return <Tab key={`tab-${index}`} className="h-64" label={label} />;
					})}
				</Tabs>
			}
			content={tabs.map((tab, index) => {
				if (columns != undefined && tab.name === columns[0]) {
					return (
						<Mesh
							onEdit={table => setTablesChange(table)}
							zone={tabs[index]}
							onAdd={table => {
								setNewZone(false);
								setNewTable(true);
								setTablesChange(table);
							}}
						/>
					);
				}
			})}
			rightSidebarHeader={
				<div className="p-24">
					<h4>{String(tabs[selectedTabIndex].name).toLocaleUpperCase()}</h4>
				</div>
			}
			rightSidebarContent={
				<div className="p-24">
					{newZone !== true && newTable !== true && <h4>{'< Seleccione una mesa'}</h4>}
					{newZone === true && (
						<div>
							<Formsy
								onValidSubmit={data => {
									addZone(data);
								}}
							>
								<TextFieldFormsy type="text" name="zone" label="Zone" variant="outlined" required />
								<div style={{ display: 'flex', marginTop: '10px' }}>
									<Button
										variant="contained"
										onClick={() => {
											setButtonConfiguration(false);
											setNewZone(false);
										}}
										style={{ marginRight: '10px' }}
									>
										cancelar
									</Button>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										style={{ marginRight: '10px' }}
									>
										guardar
									</Button>
								</div>
							</Formsy>
						</div>
					)}
					{newTable === true && (
						<Formsy
							onValidSubmit={data => {
								addZone(data);
							}}
						>
							{Object.keys(tablesChange).map((item, i) => {								
								return (
									<Input
										name={item}
										type={
											item !== 'number' && item !== 'col' && item !== 'row' && item !== 'busy'
												? 'select'
												: 'text'
										}
										placeholder={item}
										label={item}
										value={tablesChange[item]}
										disabled={false}
										defaultValue={tablesChange[item]}
										id={i}
									/>
								);
							})}
							<div style={{ display: 'flex', marginTop: '10px' }}>
								<Button
									variant="contained"
									onClick={() => {
										setButtonConfiguration(false);
										setNewZone(false);
										setNewTable(false);
									}}
									style={{ marginRight: '10px' }}
								>
									cancelar
								</Button>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									style={{ marginRight: '10px' }}
								>
									guardar
								</Button>
							</div>
						</Formsy>
					)}
				</div>
			}
			innerScroll
			ref={pageLayout}
		/>
	);
};

// [
// 	{
// 		zone:'zona 1',
// 		tables:[
// 			{number:1,shape:'redonda',size:'chica',col:1,row:3,busy:true,group:[1,2]},
// 			{number:2,shape:'cuadrada',size:'chica',col:1,row:4,busy:true,group:[1,2]},
// 			{number:3,shape:'cuadrada',size:'chica',col:1,row:6,busy:false,group:[]},
// 		]
// 	},
// 	{
// 		zone:'zona 2',
// 		tables:[
// 			{number:1,shape:'redonda',size:'chica',col:1,row:3,busy:true,group:[]},
// 		]
// 	}
// ]

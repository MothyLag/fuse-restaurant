import React, { useRef, useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
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
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	layoutRoot: {}
});

const useActionNew = async (baseUrl, moduleName, operationName, newData) => {
	const url = `${baseUrl}/api/contracts/v1/contract/${moduleName}/v1/operation/${operationName}/new`;
	console.log('Url new', url);

	await fetch(url, {
		method: 'PUT', // or 'PUT'
		body: JSON.stringify(newData), // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(async response => {
			// await response.text()
			const responserResult = await response.text();
		})
		.catch(async error => {
			const responserError = await error.text();
			console.log('responserError', responserError);
		});
};

const useActionUpdate = async (baseUrl, moduleName, operationName, newData) => {
	const url = `${baseUrl}/api/contracts/v1/contract/${moduleName}/v1/operation/${operationName}/record/${newData.id}/update`;

	await fetch(url, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(newData), // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => {
			console.log('response', response);
		})
		.catch(error => {
			console.log('error', error);
		});
};

const useActionDelete = async (baseUrl, moduleName, operationName, newData) => {
	const url = `${baseUrl}/api/contracts/v1/contract/${moduleName}/v1/operation/${operationName}/record/${newData.id}/delete`;
	console.log('useActionDelete URL', url);

	await fetch(url, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(newData), // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => {
			console.log('response', response);
		})
		.catch(error => {
			console.log('error useActionDelete', error);
		});
};
const useActionRemove = async (baseUrl, moduleName, operationName, newData) => {
	const url = `${baseUrl}/api/contracts/v1/contract/${moduleName}/v1/operation/${operationName}/record/${newData.id}/remove`;
	console.log('useActionRemove URL', url);

	await fetch(url, {
		method: 'DELETE', // or 'PUT'
		body: JSON.stringify(newData), // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => {
			console.log('response', response);
		})
		.catch(error => {
			console.log('error useActionDelete', error);
		});
};

const useOperationSchema = (baseUrl, moduleName, operationName) => {
	const url = `${baseUrl}/api/contracts/v1/contract/${moduleName}/v1/operation/${operationName}/schema`;

	const [error, setError] = useState(null);
	const [operationSchema, setOperationSchema] = useState(null);

	if (operationSchema) {
		console.log('operationSchema', operationSchema);
	}

	useEffect(() => {
		if (!operationName) return;

		setError(null);
		setOperationSchema(null);
		(async () => {
			const response = await fetch(url);

			if (!response.ok) {
				const error = await response.text();
				setError(error);
				return;
			}
			const operationSchemas = await response.json();
			setOperationSchema(operationSchemas);
		})();
	}, [baseUrl, moduleName, operationName]);

	return { operationSchema, error };
};

export default props => {
	const { operationName1, mode, handleChangeMode, data, moduleName } = props;

	const [newData, setNewData] = useState({});
	const [newMode, setNewMode] = useState('read');

	const baseUrl = 'http://132.148.165.49:6001';

	const [operationName, setOperationName] = useState(operationName1);

	const classes = useStyles();

	const pageLayout = useRef(null);

	const { operationSchema, error: schemaError } = useOperationSchema(baseUrl, moduleName, operationName);

	const [tabs, setTabs] = useState([
		{
			label: 'Cargando acciones...'
		}
	]);

	const [tabsReady, setTabsReady] = useState(false);
	const [selectedTab, setSelectedTab] = useState(null);
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);

	useEffect(() => {
		setOperationName(operationName1);
		setSelectedTabIndex(0);
		setSelectedTab(null);
	}, [operationName1]);

	useEffect(() => {
		if (!mode) return;
		setOperationName(operationName1);
		// setSelectedTabIndex(0);
		setNewMode(mode);
	}, [mode]);

	useEffect(() => {
		if (newMode === 'new') {
			setNewData({});
		}
	}, [newMode]);

	useEffect(() => {
		if (!data) return;
		setOperationName(operationName1);
		setSelectedTabIndex(0);
		setNewData(data);
	}, [data]);

	useEffect(() => {
		if (!operationSchema) {
			setTabs([
				{
					label: 'Cargando acciones...'
				}
			]);
			setTabsReady(false);
			return;
		}

		setTabs(operationSchema.groups);
		setTabsReady(true);
	}, [operationSchema]);

	useEffect(() => {
		if (tabsReady) {
			setSelectedTab(tabs[0]);
		}
	}, [tabsReady]);

	useEffect(() => {
		if (tabsReady) {
			const tab = tabs[selectedTabIndex];
			setSelectedTab(tab);
		}
	}, [selectedTabIndex, operationName, operationSchema]);

	const handleChange = event => {
		if (event.target.type === 'checkbox') {
			setNewData({
				...newData,
				[event.target.name]: event.target.checked
			});
			return;
		}
		setNewData({
			...newData,
			[event.target.name]: event.target.value
		});
	};

	const newModeFields = selectedTab
		? selectedTab.fields.map((field, index) => {
				const { name, type, required, edit, relation, description } = field;
				// console.log('newDatasas', newData);
				let render = <span>{Object.keys(newData).length > 0 ? newData[`${name}`] : 'No editable'}</span>;
				if (mode === 'new') {
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
									value={newData[`${name}`]}
									onChange={event => {
										// if (event.key !== 'Enter') return;
										handleChange(event);
									}}
									variant="outlined"
									fullWidth
								/>
							);
						}
						if (type === 'id') {
							render = (
								<Typography variant="subtitle1">
									{Object.keys(newData).length > 0 ? newData[`${name}`] : 'No editable'}
								</Typography>
							);
						}
						if (type === 'boolean') {
							render = (
								<Switch
									checked={Object.keys(newData).length > 0 ? newData[`${name}`] : false}
									name={name}
									onChange={event => {
										handleChange(event);
									}}
									// value="checkedA"
									inputProps={{ 'aria-label': 'secondary checkbox' }}
								/>
							);
						}
						render = (
							<TextField
								className="mt-8 mb-16"
								// error={form.name === ''}
								required={required}
								label={name}
								autoFocus
								id={name}
								name={name}
								value={newData[`${name}`]}
								onChange={event => {
									handleChange(event);
								}}
								variant="outlined"
								fullWidth
							/>
						);
					}
				}
				if (mode === 'edit') {
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
									value={newData[`${name}`]}
									onChange={event => {
										handleChange(event);
									}}
									variant="outlined"
									fullWidth
								/>
							);
						}
						if (type === 'id') {
							render = (
								<Typography variant="subtitle1">
									{Object.keys(newData).length > 0 ? newData[`${name}`] : 'No editable'}
								</Typography>
							);
						}
						if (type === 'boolean') {
							render = (
								<Switch
									checked={Object.keys(newData).length > 0 ? newData[`${name}`] : false}
									name={name}
									onChange={event => {
										handleChange(event);
									}}
									// value="checkedA"
									inputProps={{ 'aria-label': 'secondary checkbox' }}
								/>
							);
						}
					}
				}

				return (
					<div key={`field-${index}`}>
						<div className="mb-8">
							<Typography variant="h6">{name}</Typography>
						</div>
						<div className="mr-8">{render}</div>
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
					<div className="flex items-around py-24">
						<Hidden lgUp>
							<IconButton
								onClick={ev => pageLayout.current.toggleRightSidebar()}
								aria-label="open right sidebar"
							>
								<Icon>menu</Icon>
							</IconButton>
						</Hidden>
						{/* <div className="flex-1">
							<h4>Acciones {operationName}</h4>
						</div> */}

						<IconButton
							disabled={newMode === 'new' || newMode === 'edit'}
							onClick={ev => {
								if (!handleChangeMode) return;
								if (Object.keys(newData).length === 0) return;
								handleChangeMode('edit');
							}}
						>
							{newMode === 'edit' && <Icon color="action">edit</Icon>}
							{newMode === 'new' && <Icon color="action">edit</Icon>}
							{newMode === 'read' && <Icon color="secondary">edit</Icon>}
						</IconButton>
						<IconButton
							disabled={newMode === 'new' || newMode === 'read'}
							onClick={async ev => {
								await useActionUpdate(baseUrl, moduleName, operationName, newData);
								alert('TODO lanzar actualizacion de registo');
							}}
						>
							{newMode === 'edit' && <Icon color="secondary">sync</Icon>}
							{newMode === 'new' && <Icon color="action">sync</Icon>}
							{newMode === 'read' && <Icon color="action">sync</Icon>}
						</IconButton>
						<IconButton
							disabled={newMode === 'read' || newMode === 'edit'}
							onClick={async ev => {
								await useActionNew(baseUrl, moduleName, operationName, newData);
							}}
						>
							{newMode === 'edit' && <Icon color="action">save</Icon>}
							{newMode === 'new' && <Icon color="secondary">save</Icon>}
							{newMode === 'read' && <Icon color="action">save</Icon>}
						</IconButton>
						<IconButton
							disabled={newMode === 'new'}
							onClick={async ev => {
								if (Object.keys(newData).length === 0) return;
								await useActionDelete(baseUrl, moduleName, operationName, newData);
								alert('TODO lanzar desactivacion de registro');
							}}
						>
							{newMode === 'edit' && <Icon color="secondary">delete</Icon>}
							{newMode === 'new' && <Icon color="action">delete</Icon>}
							{newMode === 'read' && <Icon color="secondary">delete</Icon>}
						</IconButton>
						<IconButton
							disabled={newMode === 'new'}
							onClick={async ev => {
								if (Object.keys(newData).length === 0) return;
								await useActionRemove(baseUrl, moduleName, operationName, newData);
								alert('TODO lanzar eliminacion de registro');
							}}
						>
							{newMode === 'edit' && <Icon color="secondary">delete</Icon>}
							{newMode === 'new' && <Icon color="action">delete</Icon>}
							{newMode === 'read' && <Icon color="secondary">delete</Icon>}
						</IconButton>
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
			content={<div className="p-24">{newModeFields}</div>}
			innerScroll
			ref={pageLayout}
		/>
	);
};

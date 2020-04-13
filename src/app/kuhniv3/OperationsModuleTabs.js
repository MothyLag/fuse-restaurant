import React, { useRef, useState, useEffect, createContext, useReducer } from 'react';

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
import ContractTabs from './ContractTabs';
import ContractTable from './ContractTable';

const useStyles = makeStyles({
	layoutRoot: {}
});

export const UIContext = createContext({
	state: null,
	dispatch: null
});

export const TabsContext = createContext({
	state: null,
	dispacth: null
});

const uiReducer = (state, action) => {
	const { type, payload } = action;

	if (type === 'SELECT_TAB') {
		const { index, data } = payload;
		return {
			...state,
			selectedTabIndex: index >= 0 ? index : state.index,
			selectedTab: data || state.data
		};
	}
};

const useContractSchema = (baseUrl, moduleName) => {
	const url = `${baseUrl}/api/contracts/v1/contract/${moduleName}/v1?username=bot1&token=123`;
	// http://132.148.165.49:6001/api/contracts?username=bot1&token=123
	console.log('url main schema', url);

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
	const url = `${baseUrl}/api/contracts/v1/contract/${moduleName}/v1/operation/${operationName}/records`;

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
	// const baseUrl = "http://192.168.1.104:6001";

	const baseUrl = 'http://132.148.165.49:6001';

	const classes = useStyles();

	const pageLayout = useRef(null);

	const { schema, error: schemaError } = useContractSchema(baseUrl, moduleName);

	const [uiState, uiDispatch] = useReducer(uiReducer, {
		selectedTabIndex: 0,
		selectedTab: null
	});

	const [tabs, setTabs] = useState([]);

	useEffect(() => {
		if (schema !== null) {
			setTabs(schema.contract.operations);
		}
	}, [schema]);

	return (
		<UIContext.Provider
			value={{
				state: uiState,
				dispatch: uiDispatch
			}}
		>
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
							// title={moduleName}
							// operationName={operationName}
							// handleChangeMode={handleChangeMode}
							/>
						</div>
					</div>
				}
				contentToolbar={<ContractTabs tabs={tabs} />}
				content={<ContractTable moduleName={moduleName} />}
				rightSidebarContent={
					<ActionsOperationTabs
					// operationName1={operationName}
					// mode={mode}
					// handleChangeMode={handleChangeMode}
					// data={data}
					// moduleName={moduleName}
					/>
				}
				innerScroll
				ref={pageLayout}
			/>
		</UIContext.Provider>
	);
};

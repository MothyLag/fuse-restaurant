import React, { useContext, useEffect } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { UIContext } from './OperationsModuleTabs';

export default props => {
	const { tabs } = props;

	const { state: uiState, dispatch: uiDispatch } = useContext(UIContext);

	const { selectedTabIndex, selectedTabData } = uiState;

	useEffect(() => {
		if (!tabs) return;
		if (tabs) {
			uiDispatch({
				type: 'SELECT_TAB',
				payload: {
					index: 0,
					data: tabs[0]
				}
			});
		}
	}, [tabs]);

	return (
		<Tabs
			value={selectedTabIndex}
			onChange={(event, index) =>
				uiDispatch({
					type: 'SELECT_TAB',
					payload: {
						index,
						data: 'Hi'
					}
				})
			}
			indicatorColor="primary"
			textColor="primary"
			variant="scrollable"
			scrollButtons="on"
			className="w-full h-64"
		>
			{tabs.map((tab, index) => {
				const { name, label } = tab;
				return (
					<Tab
						key={`tab-${index}`}
						className="h-64"
						label={name || label}
						onClick={() => {
							uiDispatch({
								type: 'SELECT_TAB',
								payload: {
									index,
									data: tab
								}
							});
						}}
					/>
				);
			})}
		</Tabs>
	);
};

import withReducer from 'app/store/withReducer';
import React, { useState, useEffect } from 'react';
import reducer from './store/reducers';
import ActionsOperationTabs from './ActionsOperationTabs';
import OperationsModuleTabs from './OperationsModuleTabs';

function Module(props) {
	console.log('Module props', props);
	return (
		<>
			<OperationsModuleTabs moduleName={props.route.state.name} />
		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Module);

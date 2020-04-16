import React, { useState, useEffect } from 'react';
import FormEdit from '../FormEdit/FormEdit';
import { data, kit , fakeDataTwo} from '../../rodrigo/fakeData';

const stylesSection = {
	width: '100%',
	padding: '20px',
	display: 'flex',
	justifyContent: 'space-between',
	background: 'orange'
};

const newStylesDiv = {
	background: '#639'
};

const HeaderSalon = props => {
	// props
	const { TipoSala, IdEdit = '' } = props;
	// usestate
	const [InputFields, setInputFields] = useState();
	// Functional Components
	useEffect(() => {
		let fields = [];
		fields = [{ size: 'col-md-12', inputs: kit.component.inputs }];
		setInputFields(fields);
	}, []);
	return (
		<>
			<section style={stylesSection}>
				<h2>{TipoSala}</h2>
			</section>
			<div style={newStylesDiv}>
				<FormEdit id="2" fieldsApi={fakeDataTwo} />
			</div>
			<div>
				<h2>hju</h2>
			</div>
		</>
	);
};

export default HeaderSalon;

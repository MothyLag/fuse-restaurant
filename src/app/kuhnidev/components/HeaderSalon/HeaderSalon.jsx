import React, { useState, useEffect } from 'react';
import ButtonC from '../ButtonC/ButtonC';
import FormEdit from '../FormEdit/FormEdit';
import { data, kit } from '../../rodrigo/fakeData';

const stylesSection = {
	width: '100%',
	padding: '20px',
	display: 'flex',
	justifyContent: 'space-between',
	background: 'orange'
};

const newStylesDiv = {
	background: '#639'
}

const HeaderSalon = props => {
	// props
	const { TipoSala, IdEdit = '' } = props;
	// usestate
	const [IdChange, setId] = useState();
	const [InputFields, setInputFields] = useState();
	// Functional Components
	useEffect(() => {
		let fields = [];
		fields = [{ size: 'col-md-12', inputs: kit.component.inputs }];
		setInputFields(fields);
	}, []);

	const HandleForm = variable => {
		console.log(variable);
		setId(variable);
	};
	return (
		<>
			<section style={stylesSection}>
				<h2>{TipoSala}</h2>
				<div>
					<ButtonC
						title="Nueva sala"
						icon="add"
						handleChange={HandleForm}
						color="primary"
						diabledTf={false}
					/>
				</div>
			</section>
			{IdChange ? (
				<div style={newStylesDiv}>
					<FormEdit id="2" fields={InputFields} />
				</div>
			) : null}
			<div>
				<h2>hju</h2>
			</div>
		</>
	);
};

export default HeaderSalon;

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


const HeaderSalon = props => {
	// props
	const { TipoSala, IdEdit = '' } = props;
	// usestate
	const [IdChange, setId] = useState();
	const [InputFields, setInputFields] = useState();
	// Functional Components	
	useEffect(() => {
		console.log(data.fields.length);
		// const length  = kit.length
	
		let fields = [];
	
		fields = [{ size: 'col-md-12', inputs: kit.component.inputs }];
		// if (length > 0 && length <= 10) {
		// } else if (length > 10 && length <= 20) {
		// 	fields = [
		// 		{ size: 'col-md-6 col-sm-12', inputs: data.slice(0, 10) },
		// 		{ size: 'col-md-6 col-sm-12', inputs: data.slice(10, 20) }
		// 	];
		// } else if (length > 20 && length <= 30) {
		// 	fields = [
		// 		{ size: 'col-md-4 col-sm-12', inputs: data.slice(0, 10) },
		// 		{ size: 'col-md-4 col-sm-12', inputs: data.slice(10, 20) },
		// 		{ size: 'col-md-4 col-sm-12', inputs: data.slice(20, 30) }
		// 	];
		// } else if (length > 30 && length <= 40) {
		// 	fields = [
		// 		{ size: 'col-md-3 col-sm-12', inputs: data.slice(0, 10) },
		// 		{ size: 'col-md-3 col-sm-12', inputs: data.slice(10, 20) },
		// 		{ size: 'col-md-3 col-sm-12', inputs: data.slice(20, 30) },
		// 		{ size: 'col-md-3 col-sm-12', inputs: data.slice(30, 40) }
		// 	];
		// } else if (length > 40 && length <= 50) {
		// 	fields = [
		// 		{ size: 'col-md-3 col-sm-12', inputs: data.slice(0, 13) },
		// 		{ size: 'col-md-3 col-sm-12', inputs: data.slice(13, 26) },
		// 		{ size: 'col-md-3 col-sm-12', inputs: data.slice(26, 39) },
		// 		{ size: 'col-md-3 col-sm-12', inputs: data.slice(39, 50) }
		// 	];
		// }
		setInputFields(fields);
	}, []);
	return (
		<>
			<section style={stylesSection}>
				<h2>{TipoSala}</h2>
				<div>
					<ButtonC title="Nueva sala" icon="create" />
				</div>
			</section>
			{IdChange ? (
				<div>
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

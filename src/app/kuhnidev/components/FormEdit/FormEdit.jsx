/** ************************************************* */
// Filename: Form.jsx
// Created: Eduardo Monter Alonso | Ivan Figueroa | Andrés Arturo Olan
// Change history:
// 04.04.2020 / Eduardo Monter Alonso | Ivan Figeroa | Andrés Arturo Olan
/** ************************************************* */
/* Componente tipo formulario para modificar información de la api */
/** ************************************************* */
// EOF:
/** ************************************************* */
import React, { useState } from 'react';
import Formsy from 'formsy-react';
import Input from '../input/Input';

export default props => {
	const { fieldsApi = [], id, datas = {} } = props;
	// const [dataForm, setDataForm] = useState(datas);
	// useEffect para escuchar el ciclo de vida
	// debugger;
	const {
		0: {
			name,
			label,
			collection,
			fields: {
				0: { tables }
			}
		}
	} = fieldsApi;
	const ObjectTable = Object.entries(tables);
	const ObjectT2 = Object.entries(ObjectTable[0][1]);
	return (
		// define el id del formulario al del padre
		<Formsy
			onValidSubmit={async data => {
				const response = await fetch('https://kapi-marcas.badillosoft.now.sh/api/marcas/new', {
					method: 'POST',
					headers: {
						// "Content-Type": "x-www-form-urlencoded"
						'Content-Type': 'application/json'
					},
					mode: 'cors',
					body: JSON.stringify({
						id: `marc${Math.random()
							.toString()
							.slice(2)}`,
						...data
					})
				});

				if (!response.ok) {
					const error = await response.text();
					console.warn(error);
					return;
				}

				const json = await response.json();

				console.log(json);
			}}
			// onValid={enableButton}
			// onInvalid={disableButton}
			// ref={formRef}
			className="flex flex-col justify-center"
		>
			<div className="row">
				{/* mapea lo obtenido en la doc de la api */}
				{/* number: 1
				shape: "redonda"
				size: "chica"
				col: 1
				row: 3
				busy: true */}
				{ObjectTable ? ObjectT2.map(item => <Input name={item[0]} placeholder={item[1]} />) : <div>uhuh</div>}
			</div>
		</Formsy>
	);
};

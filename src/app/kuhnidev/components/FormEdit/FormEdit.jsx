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
	const { fields = [], id, datas = {} } = props;
	// const [dataForm, setDataForm] = useState(datas);
	// useEffect para escuchar el ciclo de vida
	// debugger
	// console.log(fields)
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
				{fields.map((column, index) => {
					return (
						<div key={`columna${index}`} className={column.size}>
							{/* mapea cada columna de la doc */}
							{column.inputs.map((input, i) => {
								return (
									<div key={`inputKey${index}${i}`}>
										<Input
											name={input.name}
											id={input.name + i + id}
											type={input.type}
											// defaultValue={dataForm[input.name]}
											regex={input.regex}
											placeholder={input.placeholder}
											required={input.required}
											index={index}
											i={i}
											options={input.options}
											disabled={input.disabled}
											label={input.label}
											api={input.api}
										/>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</Formsy>
	);
};

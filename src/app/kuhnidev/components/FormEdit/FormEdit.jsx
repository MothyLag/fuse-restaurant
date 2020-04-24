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
import React, { useState, useEffect } from 'react';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Input from '../input/Input';

export default props => {
	const { fieldsApi = {}, id, datas = {}, showForm } = props;
	// const [dataForm, setDataForm] = useState(datas);
	const [apiDataCalled, setApiDataCalled] = useState();
	const [openForm, SetOpenForm] = useState(false);
	const [openButtonD, SetOpenButtonD] = useState(false);

	const [apitFields, setApi] = useState({});
	useEffect(() => {
		(async function() {
			const response = await fetch('https://kapi-zonas.now.sh/api/zonas/docs', {
				method: 'GET',
				headers: {
					// "Content-Type": "x-www-form-urlencoded"
					'Content-Type': 'application/json'
				},
				mode: 'cors'
			});

			if (!response.ok) {
				const error = await response.text();
				console.warn(error);
				return;
			}

			const json = await response.json();
			// console.log(json)
			// console.log(fieldsApi)
			setApiDataCalled(json);
		})();
	}, []);

	useEffect(() => {
		setApi(fieldsApi);
		console.log(fieldsApi);
	}, [fieldsApi]);

	const divStyleForm = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0px',
		margin: '20px 0px'
	};
	const stylesSection = {
		width: '100%',
		padding: '20px',
		display: 'flex',
		justifyContent: 'space-between'
	};

	const onHandleDeleteSala = variable => {
		const zonaId = variable;
		console.log('delete');
		setApi(false);
		(async function() {
			const response = await fetch(`https://kapi-marcas.badillosoft.now.sh/api/zonas/${zonaId}/delete`, {
				method: 'POST',
				headers: {
					// "Content-Type": "x-www-form-urlencoded"
					'Content-Type': 'application/json'
				},
				mode: 'cors',
				body: JSON.stringify({
					//data
				})
			});

			if (!response.ok) {
				const error = await response.text();
				console.warn(error);
				return;
			}

			const json = await response.json();
			console.log(json);
		})();
	};

	const onHandleCancel = () => {
		SetOpenForm(false);
		setApi(null);
	};
	return (
		// define el id del formulario al del padre
		<>
			{apitFields && openForm !== true ? (
				<section style={stylesSection}>
					<h2>{fieldsApi && openForm !== null ? fieldsApi.name : null}</h2>
					<div>
						<Button
							style={{ marginRight: '20px' }}
							variant="contained"
							color="primary"
							onClick={onHandleDeleteSala}
							disabled={openButtonD}
						>
							<DeleteForeverIcon />
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								SetOpenForm(true);
							}}
						>
							<EditIcon />
						</Button>
					</div>
				</section>
			) : null}
			{openForm ? (
				<>
					<Formsy
						onValidSubmit={async data => {
							if (fieldsApi.shape === '') {
								SetOpenForm(false);
								setApi(null);
							} else {
								console.log('POST');
								SetOpenForm(false);
								setApi(null);
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
							}
						}}
						// onValid={enableButton}
						// onInvalid={disableButton}
						// ref={formRef}
					>
						{/* number: 1
						shape: "redonda"
						size: "chica"
						col: 1
						row: 3
						busy: true */}
						{fieldsApi && openForm ? (
							Object.entries(fieldsApi).map((item, i) => {
								// console.log(Object.entries(fieldsApi));
								// console.log(fieldsApi)
								// console.log(item);
								return (
									<Input
										stylesDiv={divStyleForm}
										name={item[0]}
										type={
											item[0] !== 'number' &&
											item[0] !== 'col' &&
											item[0] !== 'row' &&
											item[0] !== 'busy'
												? 'select'
												: 'text'
										}
										placeholder={item[1]}
										label={item[0]}
										value={item[1]}
										disabled={false}
										defaultValue={item[1]}
										id={i}
									/>
								);
							})
						) : (
							<div>Click en algun cuadro para editar</div>
						)}
						{fieldsApi && openForm ? (
							<div style={divStyleForm}>
								<Button
									variant="contained"
									color="default"
									style={{ marginRight: '10px' }}
									onClick={onHandleCancel}
								>
									Cancelar
								</Button>
								<Button type="submit" variant="contained" color="primary">
									{fieldsApi.size === '' ? 'Agregar' : 'Actualizar'}
								</Button>
							</div>
						) : null}
					</Formsy>
				</>
			) : null}
		</>
	);
};

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
import CancelIcon from '@material-ui/icons/Cancel';
import Input from '../input/Input';

export default props => {
	const { fieldsApi = [], id, datas = {} } = props;
	// const [dataForm, setDataForm] = useState(datas);
	const [apiDataCalled, setApiDataCalled] = useState();
	const [openForm, SetOpenForm] = useState(false);
	const [openButtonD, SetOpenButtonD] = useState(false);
	const [openButtonE, SetOpenButtonE] = useState(false);
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

	const divStyleForm = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '10px'
	};
	const stylesSection = {
		width: '100%',
		padding: '20px',
		display: 'flex',
		justifyContent: 'space-between',
		background: 'orange'
	};

	const onHandleDeleteSala = variable => {
		const zonaId = variable;
		console.log('delete');
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

	return (
		// define el id del formulario al del padre
		<>
			<section style={stylesSection}>
				<h2>{name}</h2>
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
							SetOpenButtonD(true);
						}}
						disabled={openButtonE}
						>
						<EditIcon />
					</Button>
				</div>
			</section>
			{openForm ? (
				<>
					<Button
						style={{
							position: 'absolute',
							right: '1%'
						}}
						onClick={() => {SetOpenForm(false);SetOpenButtonD(true);
						}}
					>
						<CancelIcon />
					</Button>
					<Formsy
						onValidSubmit={async data => {
							SetOpenButtonD(true)
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
							SetOpenButtonD(false);
							console.log(json);
						}}
						// onValid={enableButton}
						// onInvalid={disableButton}
						// ref={formRef}
					>
						{/* mapea lo obtenido en la doc de la api */}
						{/* number: 1
						shape: "redonda"
						size: "chica"
						col: 1
						row: 3
						busy: true */}
						{ObjectTable ? (
							ObjectT2.map(item => (
								<Input
									stylesDiv={divStyleForm}
									name={item[0]}
									type="text"
									placeholder={item[1]}
									label={item[0]}
								/>
							))
						) : (
							<div>uhuh</div>
						)}
						<div style={divStyleForm}>
							<Button type="submit" variant="contained" color="primary">
								actualizar
							</Button>
						</div>
					</Formsy>
				</>
			) : null}
		</>
	);
};

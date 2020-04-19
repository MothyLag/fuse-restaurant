import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { TextFieldFormsy } from '@fuse/core/formsy';

const nwStyle = makeStyles({
	root: {
		maxWidth: '250px',
		width: '100%'
	}
});
const labelColor = {
	color: '#fff'
};
export default props => {
	const {
		name,
		id,
		disabled,
		label,
		options,
		value,
		type,
		defaultValue = '',
		regex,
		placeholder,
		required,
		index,
		i,
		api,
		stylesDiv
	} = props;
	const [dataOptions, setDataOptions] = useState([]);
	const [selectValue, setSelectValue] = useState(defaultValue);
	const selectStyles = nwStyle();
	const handleSelectChange = (setState, event) => {
		setState(event.target.value);
	};

	const onCorrectRes = async (res, setState) => {
		const { results } = await res.json();
		const aux = results.map(item => item);
		setState(aux);
	};
	const onErrorRes = error => {};
	useEffect(() => {
		if (options === undefined) {
			if (type === 'select') {
				fetch(`${api}`, {
					method: 'GET',
					mode: 'cors'
					//body: JSON.stringify(data)
				})
					.then(res => onCorrectRes(res, setDataOptions))
					.catch(error => onErrorRes(error));
			}
		} else {
			setDataOptions(options);
		}
	}, []);

	if (type === 'textarea') {
		return (
			<div className="form-group" id={id} key={`textArea${i}`}>
				<label htmlFor={name}>{name}</label>
				<textarea
					disabled={disabled}
					className="form-control"
					required={required}
					//name es el nombre del input
					name={name}
					// se define como id una concatenación del id del componente padre, el nombre del input y el indice de la columna
					id={id}
					type="checkbox"
					//define si la casilla debe o no estar marcada por defecto
					// defaultChecked={defaultValue}
				/>
				{/* crea una etiqueta con el nombre del input */}
			</div>
		);
	}

	if (type === 'select') {
		return (
			<div id={id} className="form-group" required={required}>
				<FormControl className={selectStyles.root}>
					<InputLabel id={id} style={labelColor}>
						{name}
					</InputLabel>
					<Select
						labelId={id}
						onChangeCapture={e => handleSelectChange(setSelectValue, e)}
						name={name}
						defaultValue={selectValue}
						disabled={disabled}
					>
						{dataOptions.length < 1 && <option value="NotFound">Valor no encontrado</option>}
						{dataOptions.map((option, index) => {
							return (
								<MenuItem value={option[label]} key={`optionInput${index}`}>
									{option[label]}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				{/* <label>{name}</label>
				<select
					onChangeCapture={e => handleSelectChange(setSelectValue, e)}
					name={name}
					defaultValue={selectValue}
					className="form-control mt-1"
					disabled={disabled}
				>
					{dataOptions.length < 1 && <option value="NotFound">Valor no encontrado</option>}
					{dataOptions.map((option, index) => {
						return (
							<option value={option[label]} key={`optionInput${index}`}>
								{option[label]}
							</option>
						);
					})}
				</select> */}
			</div>
		);
	}

	if (type === 'checkbox')
		return (
			<div className="custom-control custom-checkbox my-1 mr-sm-2" key={`checkbox${i}`}>
				<input
					required={required}
					//name es el nombre del input
					name={id}
					// se define como id una concatenación del id del componente padre, el nombre del input y el indice de la columna
					id={id}
					type="checkbox"
					className="custom-control-input"
					//define si la casilla debe o no estar marcada por defecto
					defaultChecked={defaultValue}
				/>
				{/* crea una etiqueta con el nombre del input */}
				<label className="custom-control-label" htmlFor={id}>
					{name}
				</label>
			</div>
		);

	return (
		<div key={`input${i}`} style={stylesDiv}>
			{/* <label htmlFor={name}>{name}</label> */}
			<TextFieldFormsy
			className={selectStyles.root}				
				label={name}
				variant="outlined"
				color="primary"
				disabled={disabled}
				required={required}
				id={id}
				// valida que se cumpla el regex en el input
				pattern={regex ? String(regex) : '[a-zA-Z0-9 \\s]{0,}'}
				// define el nombre del input
				name={name}
				// define el valor por defecto
				defaultValue={defaultValue || ''}
				autoComplete="off"
				// define el tipo de input
				type={type}
				// define el placeholder del input
				placeholder={placeholder}
				value={value}
			/>
			{/* <input
				disabled={disabled}
				required={required}
				// concate los indices al id del padre y al nombre del input para crear un nuevo id
				id={id}
				// valida que se cumpla el regex en el input
				pattern={regex ? String(regex) : '[a-zA-Z0-9 \\s]{0,}'}
				// define el nombre del input
				name={name}
				// define el valor por defecto
				defaultValue={defaultValue || ''}
				autoComplete="off"
				// define el tipo de input
				type={type}
				// define el placeholder del input
				placeholder={placeholder}
				className="form-control"
				// define si el input es requerido
			/> */}
		</div>
	);
};

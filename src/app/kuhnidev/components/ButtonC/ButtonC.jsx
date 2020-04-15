import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

const sizeIcon = makeStyles({
	root: {
		fontSize: '20px',
		marginRight: '5px'
	}
});
const ButtonC = props => {
	const { title = '', icon = '', handleChange = '', color = 'default', diabledTf = false } = props;
	const onHandleDeleteTable = variable => {
		console.log('hi Delete', variable);
	};
	const onHandleEditTable = variable => {
		console.log('his edit', variable);
		handleChange(variable);
	};
	const IconStyles = sizeIcon();
	const iconSelected = variable => {
		switch (variable) {
			case 'create':
				return <CreateIcon className={IconStyles.root} />;
			case 'delete':
				return <DeleteIcon className={IconStyles.root} />;
			case 'check':
				return <CheckIcon className={IconStyles.root} />;
			case 'add':
				return <AddIcon className={IconStyles.root} />;
			default:
				return null;
		}
	};
	const newIcon = iconSelected(icon);

	return (
		<>
			<Button variant="contained" color={color} onClick={() => onHandleEditTable(title)} disabled={diabledTf}>
				{newIcon} {title}
			</Button>
		</>
	);
};

export default ButtonC;

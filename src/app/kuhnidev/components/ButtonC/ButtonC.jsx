import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
	root: {
		width: '45px',
		height: '45px',
		minWidth: '40px',
		padding: '0px',
		background: '#737373',
		position: 'relative',
		'&:hover': {
			background: '#000'
		},
		marginRight: '10px'
	}
});

const ButtonStyles = makeStyles({
	root: {
		color: 'white',
		fontSize: '20px',
		marginRight: '10px'
	}
});

const ButtonC = props => {
	const { title = '', icon = '' } = props;
	const onHandleDeleteTable = variable => {
		console.log('hi Delete', variable);
	};
	const onHandleEditTable = variable => {
		console.log('his edit', variable);
	};

	const classes = useStyles();
	const ClassesIcon = ButtonStyles();

	const iconSelected = variable => {
		switch (variable) {
			case 'create':
				return <CreateIcon className={ClassesIcon.root} />;
			case 'delete':
				return <DeleteIcon className={ClassesIcon.root} />;
			case 'check':
				return <CheckIcon className={ClassesIcon.root} />;
			case 'add':
				return <AddIcon className={ClassesIcon.root} />;
			default:
				return null;
		}
	};
	const newIcon = iconSelected(icon);
	return (
		<>
			<Button variant="contained" className={title === '' ? classes.root : null}>
				{newIcon} {title}
			</Button>
		</>
	);
};

export default ButtonC;

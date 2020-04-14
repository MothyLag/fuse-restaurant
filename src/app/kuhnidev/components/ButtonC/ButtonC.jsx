import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

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
		}
	}
});

const ButtonStyles = makeStyles({
	root: {
		color: 'white',
		fontSize: '20px'
	}
});

const ButtonC = props => {
	const { deleteI } = props;
	const onHandleDeleteTable = () => {
		console.log('hi Delete');
	};
	const onHandleEditTable = () => {
		console.log('his edit');
	};

	const classes = useStyles();
	const ClassesIcon = ButtonStyles();
	return (
		<>
			<Button
				variant="contained"
				onClick={deleteI ? () => onHandleDeleteTable() : () => onHandleEditTable()}
				className={classes.root}
			>
				{deleteI ? <DeleteIcon className={ClassesIcon.root} /> : <CreateIcon className={ClassesIcon.root} />}
			</Button>
		</>
	);
};

export default ButtonC;

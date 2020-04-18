import React, { useState, useEffect } from 'react';
import { fakeDataTwo } from '../../rodrigo/fakeData';
import FormEdit from '../FormEdit/FormEdit';

const HeaderSalon = props => {
	return (
		<div>
			<FormEdit id="2" fieldsApi={fakeDataTwo} showForm={true} />
		</div>
	);
};

export default HeaderSalon;

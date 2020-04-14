import React from 'react';
import ButtonC from '../ButtonC/ButtonC';
const stylesSection = {
    width: '100%',
    padding: '20px'
}
const HeaderSalon = props => {
    const { TipoSala } = props;
	return (
		<section style={stylesSection}>
			<h2>{TipoSala}</h2>            
		</section>
	);
};

export default HeaderSalon;

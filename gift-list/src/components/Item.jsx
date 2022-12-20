import React from 'react';
import '../utils/css/Item.css';

const Item = ({ gift }) => {
	return (
		<div className='item'>
			<li>{gift}</li>
		</div>
	);
};

export default Item;

import React from 'react';
import '../utils/css/Button.css';

const Button = ({ type, value, handleClick }) => {
	return (
		<button className='button' type={type} onClick={handleClick}>
			{value}
		</button>
	);
};

export default Button;

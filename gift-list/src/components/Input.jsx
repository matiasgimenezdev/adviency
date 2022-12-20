import React from 'react';
import '../utils/css/Input.css';

const Input = (props) => {
	return (
		<input
			autoComplete='off'
			className='input'
			type={props.type}
			name={props.name}
			id={props.id}
			placeholder={props.placeholder}
			tabIndex={0}
		></input>
	);
};

export default Input;

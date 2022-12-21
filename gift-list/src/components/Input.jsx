import React from 'react';
import '../utils/css/Input.css';

const Input = ({ type, name, id, placeholder, value, handleDoubleClick }) => {
	const renderInput = () => {
		if (handleDoubleClick !== null) {
			return (
				<input
					autoComplete='off'
					className='input'
					type={type}
					name={name}
					id={id}
					placeholder={placeholder}
					defaultValue={value}
					onDoubleClick={handleDoubleClick}
				></input>
			);
		} else {
			return (
				<input
					autoComplete='off'
					className='input'
					type={type}
					name={name}
					id={id}
					placeholder={placeholder}
					defaultValue={value}
				></input>
			);
		}
	};

	return renderInput();
};

export default Input;

import React, { useEffect, useRef } from 'react';
import '../utils/css/Button.css';

const Button = ({ type, value, handleClick }) => {
	const refButton = useRef();

	useEffect(() => {
		const reference = refButton.current;
		if (reference) {
			reference.addEventListener('click', handleClick);

			return () => {
				reference.removeEventListener('click', handleClick);
			};
		}
	}, [handleClick]);

	return (
		<button className='button' ref={refButton} type={type}>
			{value}
		</button>
	);
};

export default Button;

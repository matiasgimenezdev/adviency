import React from 'react';
import '../utils/css/Form.css';
import Input from '../components/Input';
import Button from '../components/Button';

const Form = ({ handleSubmit, error }) => {
	const renderForm = () => {
		if (error) {
			return (
				<form className='form' onSubmit={handleSubmit}>
					<Input type='text' name='gift' id='gift' placeholder='¿Que regalo?' />
					<Input
						type='number'
						name='amount'
						id='amount'
						placeholder='Cantidad'
					/>
					<Input type='text' name='image' id='image' placeholder='Imagen' />
					<Input type='number' name='price' id='price' placeholder='Precio' />
					<Input type='text' name='name' id='name' placeholder='¿A quien?' />
					<small className='error'>{error}</small>
					<Button value='Agregar' type='submit' />
				</form>
			);
		} else {
			return (
				<form className='form' onSubmit={handleSubmit}>
					<Input type='text' name='gift' id='gift' placeholder='¿Que regalo?' />
					<Input
						type='number'
						name='amount'
						id='amount'
						placeholder='Cantidad'
					/>
					<Input type='number' name='price' id='price' placeholder='Precio' />
					<Input type='text' name='image' id='image' placeholder='Imagen' />
					<Input type='text' name='name' id='name' placeholder='¿A quien?' />
					<Button value='Agregar' type='submit' />
				</form>
			);
		}
	};

	return <>{renderForm()}</>;
};

export default Form;

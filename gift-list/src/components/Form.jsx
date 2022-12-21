import React from 'react';
import '../utils/css/Form.css';
import Input from '../components/Input';
import Button from '../components/Button';

const Form = ({ handleSubmit, handleRandomGift, error, values }) => {
	const renderForm = () => {
		if (error) {
			return (
				<form className='form' onSubmit={handleSubmit}>
					<small>
						Haga doble click en el input para generar un regalo aleatorio
					</small>
					<Input
						type='text'
						name='gift'
						id='gift'
						placeholder='¿Que regalo?'
						value={values.value}
						handleDoubleClick={handleRandomGift}
					/>
					<Input
						type='number'
						name='amount'
						id='amount'
						placeholder='Cantidad'
						value={values.amount}
					/>
					<Input
						type='text'
						name='image'
						id='image'
						placeholder='Imagen'
						value={values.image}
					/>
					<Input
						type='number'
						name='price'
						id='price'
						placeholder='Precio'
						value={values.price}
					/>
					<Input
						type='text'
						name='name'
						id='name'
						placeholder='¿A quien?'
						value={values.name}
					/>
					<small className='error'>{error}</small>
					<Button value='Agregar' type='submit' />
				</form>
			);
		} else {
			return (
				<form className='form' onSubmit={handleSubmit}>
					<small>
						Haga doble click en el input para generar un regalo aleatorio
					</small>
					<Input
						type='text'
						name='gift'
						id='gift'
						placeholder='¿Que regalo?'
						value={values.value}
						handleDoubleClick={handleRandomGift}
					/>
					<Input
						type='number'
						name='amount'
						id='amount'
						placeholder='Cantidad'
						value={values.amount}
					/>
					<Input
						type='text'
						name='image'
						id='image'
						placeholder='Imagen'
						value={values.image}
					/>
					<Input
						type='number'
						name='price'
						id='price'
						placeholder='Precio'
						value={values.price}
					/>
					<Input
						type='text'
						name='name'
						id='name'
						placeholder='¿A quien?'
						value={values.name}
					/>
					<Button value='Agregar' type='submit' />
				</form>
			);
		}
	};

	return <>{renderForm()}</>;
};

export default Form;

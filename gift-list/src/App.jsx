import './utils/css/App.css';
import React, { useState } from 'react';
import GiftList from './components/GiftList';
import Form from './components/Form';
import Button from './components/Button';
import Modal from 'react-modal';

function App() {
	const [gifts, setGifts] = useState([]);
	const [error, setError] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const modalStyles = {
		content: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
			gap: '2rem',
			height: '80vh',
			width: '80vw',
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			backgroundImage:
				"url('https://images.unsplash.com/photo-1606310737718-01c223c7425b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjBjaHJpc3RtYXN8ZW58MHx8MHx8&w=1000&q=80')",
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			fontSize: '2rem',
		},
		overlay: { zIndex: 1000 },
	};

	const handleShowModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
		setError(null);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const capitalizeFirstLetter = (string) => {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};

		const isRepeated = (value) => {
			let repeated = false;
			for (let item of gifts) {
				if (item.value.toLowerCase() === value) {
					repeated = true;
				}
			}
			return repeated;
		};

		const value = e.currentTarget.gift.value.toLowerCase().trim();
		const amount = e.currentTarget.amount.value;
		const image = e.currentTarget.image.value;
		const price = e.currentTarget.price.value;
		const name = e.currentTarget.name.value;

		if (isRepeated(value) || value.length === 0) {
			if (value.length === 0) {
				setError('Ingrese un regalo que no este vacío');
			} else {
				setError('Ingrese un regalo no repetido');
			}
		} else {
			if (amount <= 0) {
				setError('Ingrese una cantidad mayor a 0');
			} else {
				const gift = {
					value: capitalizeFirstLetter(value),
					amount,
					price,
					image,
					name,
				};
				e.currentTarget.reset();
				setError(null);
				setIsOpen(false);
				setGifts([...gifts, gift]);
			}
		}
	};

	const handleRemoveAllGifts = () => {
		setGifts([]);
	};

	const handleRemoveOneGift = (gift) => {
		const newState = [];
		for (let item of gifts) {
			if (item.value !== gift) {
				newState.push(item);
			}
		}
		setGifts([...newState]);
	};

	return (
		<div className='App'>
			<h2>Lista de Regalos</h2>
			<Button
				value='Nuevo regalo'
				type='button'
				handleClick={handleShowModal}
			/>
			<Modal isOpen={isOpen} style={modalStyles}>
				<h2>Agregar Regalo</h2>
				<Form handleSubmit={handleSubmit} error={error} />
				<Button value='Volver' type='button' handleClick={handleCloseModal} />
			</Modal>
			<GiftList
				gifts={gifts}
				handleRemoveAllGifts={handleRemoveAllGifts}
				handleRemoveOneGift={handleRemoveOneGift}
			/>
		</div>
	);
}

export default App;

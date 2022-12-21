import './utils/css/App.css';
import React, { useState } from 'react';
import GiftList from './components/GiftList';
import Form from './components/Form';
import Button from './components/Button';
import Modal from 'react-modal';

function App() {
	const mockGifts = [
		'Camiseta Argentina',
		'Botines',
		'Medias',
		'Jean',
		'Traje de baño',
		'Teclado',
		'Mouse',
		'Libro',
	];
	const [isUpdating, setIsUpdating] = useState(false);
	const [gifts, setGifts] = useState([]);
	const [error, setError] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [formValues, setFormValues] = useState({
		value: '',
		price: '',
		amount: '',
		image: '',
		name: '',
	});

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

	const handleRandomGift = (e) => {
		function randomGift() {
			const index = Math.floor(Math.random() * mockGifts.length);
			return mockGifts[index];
		}
		console.log(e.currentTarget);
		e.currentTarget.value = randomGift();
		console.log(e.currentTarget.value);
	};

	const handleShowModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
		setError(null);
		setFormValues({
			value: '',
			price: '',
			amount: '',
			image: '',
			name: '',
		});
		setIsUpdating(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const updateGift = (gift) => {
			const updatedGifts = [...gifts];
			updatedGifts.map((item) => {
				if (item.value === gift.value) {
					item.amount = gift.amount;
					item.price = gift.price;
					item.name = gift.name;
					item.image = gift.image;
				}
				return item;
			});
			setGifts(updatedGifts);
		};

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

		const gift = {
			value: capitalizeFirstLetter(value),
			amount,
			price,
			image,
			name,
		};

		if (isRepeated(value) || value.length === 0) {
			if (value.length === 0) {
				setError('Ingrese un regalo que no este vacío');
			} else {
				if (!isUpdating) {
					setError('Ingrese un regalo no repetido');
				} else {
					e.currentTarget.reset();
					setError(null);
					setIsOpen(false);
					setFormValues({
						value: '',
						price: '',
						amount: '',
						image: '',
						name: '',
					});
					updateGift(gift);
				}
			}
		} else {
			if (amount <= 0) {
				setError('Ingrese una cantidad mayor a 0');
			} else {
				e.currentTarget.reset();
				setError(null);
				setIsOpen(false);
				setFormValues({
					value: '',
					price: '',
					amount: '',
					image: '',
					name: '',
				});
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

	const handleUpdate = (gift) => {
		for (let item of gifts) {
			if (item.value === gift) {
				setFormValues(item);
			}
		}
		setIsUpdating(true);
		setIsOpen(true);
	};

	const sumPrice = () => {
		let total = 0;
		for (let item of gifts) {
			total = total + item.price * item.amount;
		}
		return total;
	};

	Modal.setAppElement('body');
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
				<Form
					handleSubmit={handleSubmit}
					error={error}
					values={formValues}
					handleRandomGift={handleRandomGift}
				/>
				<Button value='Volver' type='button' handleClick={handleCloseModal} />
			</Modal>
			<GiftList
				gifts={gifts}
				totalPrice={sumPrice()}
				handleRemoveAllGifts={handleRemoveAllGifts}
				handleRemoveOneGift={handleRemoveOneGift}
				handleUpdate={handleUpdate}
			/>
		</div>
	);
}

export default App;

import './utils/css/App.css';
import BackgroundMusic from './assets/sound.mp3';
import { modalStyles } from './utils/modalStyles';
import React, { useState, useEffect } from 'react';
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
	const [soundActivated, setIsActivated] = useState(false);
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

	useEffect(() => {
		if (gifts.length > 0) {
			localStorage.setItem('gifts', JSON.stringify(gifts));
		}
	}, [gifts]);

	useEffect(() => {
		const savedGifts = JSON.parse(localStorage.getItem('gifts'));
		if (savedGifts) {
			setGifts(savedGifts);
		}
	}, []);

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
		setIsUpdating(false);
		setFormValues({
			value: '',
			price: '',
			amount: '',
			image: '',
			name: '',
		});
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
			<div className='header'>
				<h2>Lista de Regalos</h2>
				{!soundActivated ? (
					<button
						type='button'
						className='sound-button'
						onClick={() => {
							setIsActivated(true);
						}}
					>
						🔇{' '}
					</button>
				) : (
					<>
						<button
							type='button'
							className='sound-button'
							onClick={() => {
								setIsActivated(false);
							}}
						>
							🔉
						</button>
						<audio
							autoPlay='autoplay'
							onPlay={(e) => {
								e.currentTarget.volume = '0.02';
							}}
						>
							<source src={BackgroundMusic} />
						</audio>
					</>
				)}
			</div>
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
					isUpdating={isUpdating}
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

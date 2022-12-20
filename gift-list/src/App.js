import React, { useState } from 'react';
import './utils/css/App.css';
import GiftList from './components/GiftList';
import Form from './components/Form';

function App() {
	const [gifts, setGifts] = useState([]);
	const [error, setError] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		const capitalizeFirstLetter = (string) => {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};

		const isRepeated = (value) => {
			let repeated = false;
			for (let item of gifts) {
				if (item.toLowerCase() === value) {
					repeated = true;
				}
			}
			return repeated;
		};

		const newGift = e.currentTarget.gift.value.toLowerCase().trim();
		if (isRepeated(newGift) || newGift.length === 0) {
			if (newGift.length === 0) {
				setError('Ingrese un regalo que no este vacío');
			} else {
				setError('Ingrese un regalo no repetido');
			}
		} else {
			setError(null);
			setGifts([...gifts, capitalizeFirstLetter(newGift)]);
		}
	};

	const handleRemoveAllGifts = () => {
		setGifts([]);
	};

	const handleRemoveOneGift = (gift) => {
		const newState = [];
		for (let item of gifts) {
			if (item !== gift) {
				newState.push(item);
			}
		}
		setGifts([...newState]);
	};

	return (
		<div className='App'>
			<h2>Lista de Regalos</h2>
			<Form handleSubmit={handleSubmit} error={error} />
			<GiftList
				gifts={gifts}
				handleRemoveAllGifts={handleRemoveAllGifts}
				handleRemoveOneGift={handleRemoveOneGift}
			/>
		</div>
	);
}

export default App;

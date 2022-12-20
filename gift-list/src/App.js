import React, { useState } from 'react';
import './utils/css/App.css';
import GiftList from './components/GiftList';
import Form from './components/Form';

function App() {
	const [gifts, setGifts] = useState([]);

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
			alert('Inserte un regalo que no este repetido');
		} else {
			setGifts([...gifts, capitalizeFirstLetter(newGift)]);
		}
	};

	const handleRemoveAllGifts = () => {
		setGifts([]);
	};

	const handleRemoveOneGift = (gift) => {
		console.log('hola');
		const newState = [];
		console.log(gift);
		for (let item of gifts) {
			if (item !== gift) {
				newState.push(item);
			}
		}
		console.log(newState);
		setGifts([...newState]);
	};

	return (
		<div className='App'>
			<h2>Lista de Regalos</h2>
			<Form handleSubmit={handleSubmit} />
			<GiftList
				gifts={gifts}
				handleRemoveAllGifts={handleRemoveAllGifts}
				handleRemoveOneGift={handleRemoveOneGift}
			/>
		</div>
	);
}

export default App;

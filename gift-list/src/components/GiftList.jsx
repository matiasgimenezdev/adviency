import React from 'react';
import '../utils/css/GiftList.css';
import Button from '../components/Button';
import Item from '../components/Item';

const GiftList = ({ gifts, handleRemoveAllGifts, handleRemoveOneGift }) => {
	const renderList = () => {
		if (gifts.length > 0) {
			return (
				<ul className='list'>
					{gifts.map((value, index) => {
						return (
							<div className='item-container'>
								<Item key={index} gift={value} />
								<Button
									value='x'
									type='button'
									handleClick={(e) => handleRemoveOneGift(value)}
								/>
							</div>
						);
					})}
				</ul>
			);
		} else {
			return (
				<ul className='list'>
					<Item gift='No hay regalos, agrega algo!' />
				</ul>
			);
		}
	};

	return (
		<div className='list-container'>
			{renderList()}
			<Button value='Remover todos' handleClick={handleRemoveAllGifts} />
		</div>
	);
};

export default GiftList;

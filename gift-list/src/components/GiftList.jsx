import React from 'react';
import '../utils/css/GiftList.css';
import Button from '../components/Button';
import Item from '../components/Item';

const GiftList = ({
	gifts,
	totalPrice,
	handleRemoveAllGifts,
	handleRemoveOneGift,
	handleUpdate,
}) => {
	const renderList = () => {
		if (gifts.length > 0) {
			return (
				<>
					<ul className='list'>
						{gifts.map((gift, index) => {
							return (
								<div className='item-container'>
									<Item
										key={index}
										gift={gift.value}
										amount={gift.amount}
										price={gift.price * gift.amount}
										image={gift.image}
										name={gift.name}
									/>
									<Button
										value='E'
										type='button'
										handleClick={() => handleUpdate(gift.value)}
									/>
									<Button
										value='x'
										type='button'
										handleClick={() => handleRemoveOneGift(gift.value)}
									/>
								</div>
							);
						})}
					</ul>
					<hr />
					<div className='totalPrice'>Total: $ {totalPrice}</div>
				</>
			);
		} else {
			return (
				<ul className='list'>
					<Item gift='No hay regalos, agrega algo!' amount={0} />
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

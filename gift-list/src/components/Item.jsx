import React from 'react';
import '../utils/css/Item.css';

const Item = ({ gift, amount, image, price, name }) => {
	return (
		<div className='item'>
			{amount > 0 ? (
				<>
					<div className='gift'>
						<li>
							🎄 {gift} x {amount} - ${price}
						</li>
						<img src={image} alt={gift} />
					</div>
					<div className='recipient'>🎁 {name}</div>
				</>
			) : (
				<>
					<li>{gift}</li>
				</>
			)}
		</div>
	);
};

export default Item;

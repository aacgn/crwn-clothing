import React from 'react';

import {
    CartItemContainer,
    ItemDetailsContainer,
    CartItemImage
  } from './cart-item.styles';

export default function CartItem({item: { imageUrl, name, quantity, price}}) {
    return (
        <CartItemContainer>
        <CartItemImage src={imageUrl} alt='item' />
        <ItemDetailsContainer>
          <span>{name}</span>
          <span>
            {quantity} x ${price}
          </span>
        </ItemDetailsContainer>
      </CartItemContainer>
    );   
}
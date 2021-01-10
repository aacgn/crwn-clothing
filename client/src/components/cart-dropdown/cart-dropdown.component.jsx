import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import {
    CartDropdownContainer,
    CartDropdownButton,
    EmptyMessageContainer,
    CartItemsContainer
  } from './cart-dropdown.styles';
  

function CartDropdown({ cartItems, toggleCartHidden, history }) {
    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length  ?
                    cartItems
                    .map(
                        cartItem => <CartItem key={cartItem.id} item={cartItem} />
                    )
                    :
                    (
                        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
                    )
                }
            </CartItemsContainer>
            <CartDropdownButton onClick={
                () => {
                    history.push('/checkout');
                    toggleCartHidden();
                }
            }>GO TO CHECKOUT</CartDropdownButton>
        </CartDropdownContainer>
    );
}

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown));
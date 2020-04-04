import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { selectCartItems, selectCartItemsTotalPrice } from '../../redux/cart/cart.selectors';

import {
    CheckoutPageContainer,
    CheckoutHeaderContainer,
    HeaderBlockContainer,
    TotalContainer,
    WarningContainer
  } from './checkout.styles';

function CheckoutPage({ cartItems, cartItemsTotalPrice }) {
    return (
        <CheckoutPageContainer>
            <CheckoutHeaderContainer>
            <HeaderBlockContainer>
                <span>Product</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Description</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Quantity</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Price</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Remove</span>
            </HeaderBlockContainer>
            </CheckoutHeaderContainer>
            {cartItems.map(cartItem => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <TotalContainer>TOTAL: ${cartItemsTotalPrice}</TotalContainer>
            <WarningContainer>
            *Please use the following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
            </WarningContainer>
            <StripeCheckoutButton price={cartItemsTotalPrice} />
        </CheckoutPageContainer>
    );
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartItemsTotalPrice: selectCartItemsTotalPrice
});

export default connect(mapStateToProps)(CheckoutPage);
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

function StripeCheckoutButton({price}) {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_IyTeQhafV27rCPrsAozzf3IZ00bMLPWBk7';

    const onToken = (token) => {
        axios({
            url: 'payment',
            method: 'POST',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successfull');
        }).catch(err => {
            console.log('Payment error ', err);
            alert('There was a issue with your payment. Please sure you use the provided credit cart.');
        });
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;
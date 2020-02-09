import React from 'react';

import './custom-button.styles.scss';

export default function CustomButton({ children, isGoogleSignIn, isInverted, ...otherProps}) {
    return (
        <button className={`${isInverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
            {children}
        </button>
    );
}
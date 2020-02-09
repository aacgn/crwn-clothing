import { CartActionTypes } from './cart.types';

export function toggleCartHidden() {
    return {
        type: CartActionTypes.TOGGLE_CART_HIDDEN
    };
}
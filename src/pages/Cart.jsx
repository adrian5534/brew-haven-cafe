import React from 'react';
import Cart from '../components/Cart';

export default function CartPage(props) {
  // Map App.jsx props to Cart's expected prop names
  return (
    <Cart
      cartItems={props.cartItems}
      recommended={props.recommended}
      onQuantityChange={props.handleQuantityChange}
      onRemove={props.handleRemove}
      onClearCart={props.handleClearCart}
      onAddRecommended={props.handleAddRecommended}
      summary={props.orderSummary}
      onApplyPromo={props.handleApplyPromo}
      onCheckout={props.handleCheckout}
      onContinueShopping={props.handleContinueShopping}
    />
  );
}
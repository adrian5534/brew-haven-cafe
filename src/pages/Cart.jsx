import React from 'react';
import Cart from '../components/Cart';

export default function CartPage(props) {
  // No local state or handlers; use props from App for all updates

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
      onUpdateCartItem={props.handleUpdateCartItem}
      editingAddOn={props.editingAddOn}
      showEditAddOnModal={props.showEditAddOnModal}
      handleEditAddOn={props.handleEditAddOn}
      handleEditRecommended={props.handleEditRecommended}
      setShowEditAddOnModal={props.setShowEditAddOnModal}
      setEditingAddOn={props.setEditingAddOn}
    />
  );
}
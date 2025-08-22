import React, { useState } from 'react';
import ItemDetailsModal from './ItemDetailsModal';
import optionsConfig from '../optionsConfig.json';
import menuData from '../menu.json';

// Map menu categories to option config keys
const categoryMap = {
  Coffee: 'Drink',
  Sandwiches: 'Sandwich',
  Pastries: 'Pastry'
};

// Helper to get options config for an item based on its type or category
function getOptionsConfigForItem(item) {
  if (item && item.type && optionsConfig[item.type]) {
    return optionsConfig[item.type];
  }
  if (item && item.category && categoryMap[item.category]) {
    return optionsConfig[categoryMap[item.category]];
  }
  // Fallback: find by name in menuData
  for (const [category, items] of Object.entries(menuData)) {
    const found = items.find(i => i.name === item.name);
    if (found && categoryMap[category]) {
      return optionsConfig[categoryMap[category]];
    }
  }
  return {};
}

export default function Cart({
  cartItems = [],
  recommended = [],
  onQuantityChange,
  onRemove,
  onClearCart,
  onAddRecommended,
  summary = {},
  onApplyPromo,
  onCheckout,
  onContinueShopping,
  onUpdateCartItem,
  editingAddOn,
  showEditAddOnModal,
  handleEditAddOn,
  handleEditRecommended,
  setShowEditAddOnModal,
  setEditingAddOn
}) {
  // Local state for editing cart items only
  const [editingItem, setEditingItem] = useState(null);

  // Edit cart item handlers
  const handleEditItem = (item) => {
    setEditingItem(item);
  };
  const handleUpdateItem = (updatedItem) => {
    if (typeof onUpdateCartItem === 'function') {
      onUpdateCartItem(updatedItem);
    }
    setEditingItem(null);
  };

  return (
    <div className="container-fluid" style={{ background: '#F5E6CC', minHeight: '100vh', padding: 0 }}>
      <div className="row justify-content-center py-5">
        <div className="col-lg-7 col-md-8 col-12">
          <div className="rounded-4 shadow-sm p-4" style={{ background: '#fff', border: '1px solid #e5e1dc' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold mb-0" style={{ color: '#3B2F2F' }}>
                Your Cart ({cartItems.length})
              </h3>
              <button
                className="btn btn-outline-dark"
                style={{ borderRadius: 12, fontWeight: 500, padding: '4px 18px' }}
                onClick={onClearCart}
              >
                Clear Cart
              </button>
            </div>
            <hr />
            {/* Cart Items */}
            {cartItems.map(item => (
              <div
                key={`${item.id}-${JSON.stringify(item.options)}-${JSON.stringify(item.addOns)}-${item.note || ''}`}
                className="d-flex align-items-center mb-3 p-3 rounded-3"
                style={{ background: '#fff', border: '1px solid #e5e1dc' }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: 'cover',
                    borderRadius: 12,
                    marginRight: 18,
                    background: '#f7f7f7'
                  }}
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-bold" style={{ color: '#3B2F2F', fontSize: '1.1rem' }}>{item.name}</div>
                      {/* Options/Tags */}
                      <div className="mb-1">
                        {Array.isArray(item.options)
                          ? item.options.map((opt, idx) => (
                              <span key={idx} className="badge rounded-pill me-2" style={{
                                background: '#f5e6cc',
                                color: '#3B2F2F',
                                fontWeight: 500,
                                fontSize: '0.95em',
                                border: '1px solid #e5e1dc'
                              }}>
                                {typeof opt === 'string' ? opt : JSON.stringify(opt)}
                              </span>
                            ))
                          : item.options && typeof item.options === 'object'
                            ? Object.entries(item.options).map(([key, value], idx) => (
                                <span key={idx} className="badge rounded-pill me-2" style={{
                                  background: '#f5e6cc',
                                  color: '#3B2F2F',
                                  fontWeight: 500,
                                  fontSize: '0.95em',
                                  border: '1px solid #e5e1dc'
                                }}>
                                  {key}: {value}
                                </span>
                              ))
                            : null
                        }
                      </div>
                      {/* Description */}
                      {item.desc && (
                        <div className="text-muted" style={{ fontSize: '0.97em' }}>{item.desc}</div>
                      )}
                    </div>
                    <div className="fw-bold" style={{ color: '#3B2F2F', fontSize: '1.1rem', minWidth: 60, textAlign: 'right' }}>
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  {/* Quantity controls */}
                  <div className="d-flex align-items-center mt-2 gap-2">
                    <button
                      className="btn btn-light"
                      style={{ borderRadius: 10, width: 32, height: 32, fontWeight: 600, fontSize: '1.1em', border: '1px solid #e5e1dc' }}
                      onClick={() => typeof onQuantityChange === 'function' && onQuantityChange(item.id, item.quantity - 1, item.options, item.addOns, item.note)}
                      disabled={item.quantity <= 1}
                    >-</button>
                    <span className="fw-bold" style={{
                      minWidth: 32,
                      textAlign: 'center',
                      fontSize: '1.1em',
                      background: '#f5e6cc',
                      borderRadius: 8,
                      border: '1px solid #e5e1dc'
                    }}>{item.quantity}</span>
                    <button
                      className="btn btn-light"
                      style={{ borderRadius: 10, width: 32, height: 32, fontWeight: 600, fontSize: '1.1em', border: '1px solid #e5e1dc' }}
                      onClick={() => typeof onQuantityChange === 'function' && onQuantityChange(item.id, item.quantity + 1, item.options, item.addOns, item.note)}
                    >+</button>
                    <button
                      className="btn btn-light ms-2"
                      style={{ borderRadius: 10, width: 32, height: 32, border: '1px solid #e5e1dc', color: '#6B4226' }}
                      onClick={() => typeof onRemove === 'function' && onRemove(item.id, item.options, item.addOns, item.note)}
                    >
                      <span aria-label="Remove" title="Remove">&#128465;</span>
                    </button>
                    <button
                      className="btn btn-light ms-2"
                      style={{ borderRadius: 10, width: 32, height: 32, border: '1px solid #e5e1dc', color: '#3B2F2F' }}
                      onClick={() => handleEditItem(item)}
                      title="Edit"
                    >
                      <span aria-label="Edit" title="Edit">&#9998;</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* Recommended Add-ons */}
            {recommended.length > 0 && (
              <div className="mt-4 p-3 rounded-4" style={{ background: '#fff', border: '1px dashed #e5e1dc' }}>
                <div className="fw-bold mb-2" style={{ color: '#3B2F2F' }}>Recommended for you</div>
                <div className="d-flex flex-wrap gap-2">
                  {recommended.map((addOn) => (
                    <div
                      key={addOn.uuid}
                      className="d-inline-flex align-items-center gap-2 rounded-3 px-2 py-1"
                      style={{
                        background: '#fff',
                        border: '1px solid #e5e1dc',
                        minWidth: 140,
                        fontWeight: 500
                      }}>
                      <input
                        type="checkbox"
                        checked={!!addOn.selected}
                        onChange={() => typeof onAddRecommended === 'function' && onAddRecommended(addOn.uuid)}
                        style={{ accentColor: '#6B4226', marginRight: 6 }}
                      />
                      <img
                        src={addOn.image}
                        alt={addOn.name}
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: 'cover',
                          borderRadius: 8,
                          background: '#f7f7f7'
                        }}
                      />
                      <span>{addOn.name}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.97em', marginLeft: 2 }}>+ ${addOn.price.toFixed(2)}</span>
                      {/* Edit button for selected add-ons */}
                      {addOn.selected && (
                        <button
                          className="btn btn-light ms-2"
                          style={{ borderRadius: 10, width: 32, height: 32, border: '1px solid #e5e1dc', color: '#3B2F2F' }}
                          onClick={() => handleEditAddOn(addOn)}
                          title="Edit Add-on"
                        >
                          <span aria-label="Edit" title="Edit">&#9998;</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Edit Modal for Cart Item */}
            {editingItem && (
              <ItemDetailsModal
                show={!!editingItem}
                onClose={() => setEditingItem(null)}
                item={editingItem}
                optionsConfig={getOptionsConfigForItem(editingItem)}
                initialOptions={editingItem.options}
                initialAddOns={editingItem.addOns}
                initialNote={editingItem.note}
                initialQuantity={editingItem.quantity || 1}
                isEditing={true}
                onUpdateCartItem={handleUpdateItem}
              />
            )}
            {/* Edit Modal for Recommended Add-on (controlled by App) */}
            {showEditAddOnModal && editingAddOn && (
              <ItemDetailsModal
                show={showEditAddOnModal}
                onClose={() => {
                  setShowEditAddOnModal(false);
                  setEditingAddOn(null);
                }}
                item={editingAddOn}
                optionsConfig={getOptionsConfigForItem(editingAddOn)}
                initialOptions={editingAddOn.options}
                initialAddOns={editingAddOn.addOns}
                initialNote={editingAddOn.note}
                initialQuantity={editingAddOn.quantity || 1}
                isEditing={true}
                onUpdateCartItem={handleEditRecommended}
              />
            )}
          </div>
        </div>
        {/* Order Summary */}
        <div className="col-lg-4 col-md-5 col-12 mt-4 mt-lg-0">
          <div className="rounded-4 shadow-sm p-4" style={{ background: '#fff', border: '1px solid #e5e1dc' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="fw-bold" style={{ fontSize: '1.15rem', color: '#3B2F2F' }}>Order Summary</div>
              <div className="text-muted" style={{ fontSize: '0.98em' }}>Pickup in 10–15 min</div>
            </div>
            <hr />
            <div className="mb-2 d-flex justify-content-between">
              <span>Items ({summary.itemsCount || 0})</span>
              <span>${summary.itemsTotal?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="mb-2 d-flex justify-content-between">
              <span>Subtotal</span>
              <span>${summary.subtotal?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="mb-2 d-flex justify-content-between">
              <span>Taxes</span>
              <span>${summary.taxes?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="mb-2 d-flex justify-content-between">
              <span>Service Fee</span>
              <span>${summary.fee?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="mb-2 d-flex justify-content-between">
              <span style={{ color: '#4E6E58', fontWeight: 500 }}>Savings</span>
              <span style={{ color: '#4E6E58', fontWeight: 500 }}>- ${summary.savings?.toFixed(2) || '0.00'}</span>
            </div>
            <hr />
            <div className="mb-3 d-flex justify-content-between align-items-center fw-bold" style={{ fontSize: '1.25rem', color: '#3B2F2F' }}>
              <span>Total</span>
              <span>${summary.total?.toFixed(2) || '0.00'}</span>
            </div>
            {/* Promo code */}
            <div className="mb-3 d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Promo code"
                style={{ borderRadius: 10, border: '1px solid #e5e1dc', marginRight: 8 }}
                value={summary.promo || ''}
                onChange={e => typeof onApplyPromo === 'function' && onApplyPromo(e.target.value)}
              />
              <button
                className="btn"
                style={{
                  background: '#4E6E58',
                  color: '#fff',
                  borderRadius: 10,
                  fontWeight: 600,
                  minWidth: 70
                }}
                onClick={() => typeof onApplyPromo === 'function' && onApplyPromo(summary.promo)}
              >
                Apply
              </button>
            </div>
            {/* Checkout buttons */}
            <button
              className="btn w-100 mb-2"
              style={{
                background: '#4E6E58',
                color: '#fff',
                borderRadius: 14,
                fontWeight: 600,
                fontSize: '1.1em',
                padding: '10px 0'
              }}
              onClick={onCheckout}
            >
              Proceed to Checkout
            </button>
            <button
              className="btn w-100"
              style={{
                background: '#fff',
                color: '#3B2F2F',
                borderRadius: 14,
                fontWeight: 600,
                fontSize: '1.1em',
                border: '2px solid #3B2F2F',
                padding: '10px 0'
              }}
              onClick={onContinueShopping}
            >
              Continue Shopping
            </button>
            <div className="mt-3 text-muted text-center" style={{ fontSize: '0.97em' }}>
              You can review delivery details on the next step.<br />
              <span className="d-inline-flex align-items-center mt-2" style={{ fontSize: '0.95em' }}>
                <span className="me-1">&#128274;</span>
                Secure checkout powered by your provider
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 991.98px) {
            .container-fluid > .row {
              flex-direction: column !important;
            }
            .col-lg-7, .col-lg-4 {
              max-width: 100% !important;
              flex: 0 0 100% !important;
            }
            .mt-lg-0 {
              margin-top: 2rem !important;
            }
          }
          @media (max-width: 767.98px) {
            .rounded-4 {
              border-radius: 1rem !important;
            }
            .rounded-3 {
              border-radius: 0.75rem !important;
            }
            .rounded-2 {
              border-radius: 0.5rem !important;
            }
            .p-4 {
              padding: 1.25rem !important;
            }
            .p-3 {
              padding: 1rem !important;
            }
            .p-2 {
              padding: 0.5rem !important;
            }
            .gap-2 {
              gap: 0.5rem !important;
            }
            .gap-3 {
              gap: 0.75rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}
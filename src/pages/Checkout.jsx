import React, { useState } from 'react';

export default function Checkout({
  cartItems = [],
  recommended = [],
  orderSummary = { subtotal: 0, taxes: 0, total: 0 },
}) {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pickupType, setPickupType] = useState('pickup');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('Today, 15–20 mins');
  const [address, setAddress] = useState('');

  // Calculate summary if not provided
  const subtotal = orderSummary.subtotal || cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedAddOns = recommended?.filter(addOn => addOn.selected) || [];
  const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + (addOn.price || 0), 0);
  const taxes = orderSummary.taxes || +((subtotal + addOnsTotal) * 0.08).toFixed(2);
  const total = orderSummary.total || +(subtotal + addOnsTotal + taxes).toFixed(2);

  return (
    <div style={{ background: '#F5E6CC', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        <nav className="mb-3" style={{ fontSize: '0.98em', color: '#7a6a58' }}>
          <span>Cart</span> <span className="mx-1">/</span> <span style={{ color: '#3B2F2F', fontWeight: 600 }}>Checkout</span> <span className="mx-1">/</span> <span>Confirmation</span>
        </nav>
        <h2 className="fw-bold mb-1" style={{ color: '#3B2F2F' }}>Checkout</h2>
        <p className="mb-4" style={{ color: '#7a6a58' }}>Review your cart and enter your details to place your order.</p>
        <div className="row g-4">
          {/* Order Summary */}
          <div className="col-lg-6">
            <div className="rounded-4 p-4 mb-4" style={{ background: '#fff', border: '1px solid #e5e1dc' }}>
              <div className="fw-bold mb-3" style={{ color: '#3B2F2F', fontSize: '1.1rem' }}>Order Summary</div>
              {cartItems.length === 0 && selectedAddOns.length === 0 ? (
                <div className="text-muted">Your cart is empty.</div>
              ) : (
                <>
                  {cartItems.map(item => (
                    <div key={item.id} className="d-flex align-items-center mb-3 p-2 rounded-3" style={{ background: '#f8f7f4', border: '1px solid #e5e1dc' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: 'cover',
                          borderRadius: 8,
                          marginRight: 16,
                          background: '#f7f7f7'
                        }}
                      />
                      <div className="flex-grow-1">
                        <div className="fw-bold" style={{ color: '#3B2F2F', fontSize: '1em' }}>{item.name}</div>
                        <div className="text-muted" style={{ fontSize: '0.97em' }}>
                          Qty {item.quantity} • ${item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="fw-bold" style={{ color: '#3B2F2F', fontSize: '1em', minWidth: 60, textAlign: 'right' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  {/* Selected Add-ons */}
                  {selectedAddOns.length > 0 && (
                    <>
                      <div className="fw-bold mt-3 mb-2" style={{ color: '#3B2F2F', fontSize: '1em' }}>Selected Add-ons</div>
                      {selectedAddOns.map(addOn => (
                        <div key={addOn.id || addOn.name} className="d-flex align-items-center mb-2 p-2 rounded-3" style={{ background: '#f8f7f4', border: '1px solid #e5e1dc' }}>
                          <img
                            src={addOn.image}
                            alt={addOn.name}
                            style={{
                              width: 40,
                              height: 40,
                              objectFit: 'cover',
                              borderRadius: 8,
                              marginRight: 12,
                              background: '#f7f7f7'
                            }}
                          />
                          <span className="fw-bold">{addOn.name}</span>
                          <span className="ms-auto">${addOn.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${(subtotal + addOnsTotal).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold" style={{ fontSize: '1.1em' }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          {/* Customer Information */}
          <div className="col-lg-6">
            <div className="rounded-4 p-4 mb-4" style={{ background: '#fff', border: '1px solid #e5e1dc' }}>
              <div className="fw-bold mb-3" style={{ color: '#3B2F2F', fontSize: '1.1rem' }}>Customer Information</div>
              <form>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      style={{ background: '#f5e6cc', borderRadius: 8, border: 'none' }}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      style={{ background: '#f5e6cc', borderRadius: 8, border: 'none' }}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ background: '#f5e6cc', borderRadius: 8, border: 'none' }}
                  />
                </div>
                <div className="mb-3 d-flex">
                  <button
                    type="button"
                    className={`btn flex-grow-1 me-2 ${pickupType === 'pickup' ? 'btn-success' : ''}`}
                    style={{
                      background: pickupType === 'pickup' ? '#4E6E58' : '#e5e1dc',
                      color: pickupType === 'pickup' ? '#fff' : '#3B2F2F',
                      borderRadius: 10,
                      fontWeight: 600,
                      border: 'none'
                    }}
                    onClick={() => setPickupType('pickup')}
                  >
                    <i className="bi bi-shop me-2"></i> Pickup at counter
                  </button>
                  <button
                    type="button"
                    className={`btn flex-grow-1 ${pickupType === 'delivery' ? 'btn-success' : ''}`}
                    style={{
                      background: pickupType === 'delivery' ? '#e5e1dc' : '#e5e1dc',
                      color: pickupType === 'delivery' ? '#3B2F2F' : '#3B2F2F',
                      borderRadius: 10,
                      fontWeight: 600,
                      border: 'none'
                    }}
                    onClick={() => setPickupType('delivery')}
                  >
                    <i className="bi bi-truck me-2"></i> Delivery to address
                  </button>
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="(555) 123-4567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{ background: '#f5e6cc', borderRadius: 8, border: 'none' }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Today, 15–20 mins"
                    value={pickupTime}
                    onChange={e => setPickupTime(e.target.value)}
                    style={{ background: '#f5e6cc', borderRadius: 8, border: 'none' }}
                  />
                </div>
                {pickupType === 'delivery' && (
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street, City, ZIP"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      style={{ background: '#f5e6cc', borderRadius: 8, border: 'none' }}
                    />
                  </div>
                )}
                <div className="mt-2 text-muted" style={{ fontSize: '0.95em' }}>
                  By placing this order, you agree to our terms and cafe policies.
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      background: '#4E6E58',
                      color: '#fff',
                      borderRadius: 10,
                      fontWeight: 600,
                      fontSize: '1.1em',
                      minWidth: 140,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    <i className="bi bi-credit-card me-2"></i> Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
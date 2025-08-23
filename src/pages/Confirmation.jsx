import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Confirmation({ setCartItems }) {
  const location = useLocation();

  // Get order details from navigation state
  const state = location.state || {};

  // Generate a random order number using uuid
  const orderId = useMemo(() => `BHC-${uuidv4().slice(0, 8).toUpperCase()}`, []);

  // Clear cart from localStorage and optionally from global state on mount
  useEffect(() => {
    localStorage.removeItem('cartItems');
    if (typeof setCartItems === 'function') {
      setCartItems([]);
    }
  }, [setCartItems]);

  // Prepare order details from state or fallback
  const orderDetails = {
    id: orderId,
    pickup: state.pickupType === 'delivery'
      ? `Delivery: ${state.address || 'N/A'} (${state.pickupTime || 'N/A'})`
      : `${state.pickupTime || 'N/A'} at counter`,
    contact: state.email || 'N/A',
    items: [
      ...(state.cartItems || []),
      ...(state.selectedAddOns || []),
    ],
    subtotal: (state.cartItems || []).reduce((sum, item) => sum + item.price * item.quantity, 0)
      + (state.selectedAddOns || []).reduce((sum, addOn) => sum + (addOn.price || 0), 0),
    tax: state.total ? +(state.total - ((state.cartItems || []).reduce((sum, item) => sum + item.price * item.quantity, 0)
      + (state.selectedAddOns || []).reduce((sum, addOn) => sum + (addOn.price || 0), 0))).toFixed(2) : 0,
    total: state.total || 0,
    firstName: state.firstName,
    lastName: state.lastName,
    phone: state.phone,
  };

  return (
    <div style={{
      background: '#F5E6CC',
      minHeight: '100vh',
      padding: '2rem 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <nav className="mb-3" style={{ fontSize: '0.98em', color: '#7a6a58', textAlign: 'center' }}>
          <span>Cart</span> <span className="mx-1">/</span> <span>Checkout</span> <span className="mx-1">/</span> <span style={{ color: '#3B2F2F', fontWeight: 600 }}>Confirmation</span>
        </nav>
        <div className="d-flex align-items-center mb-2 justify-content-center">
          <div style={{
            background: '#4E6E58',
            borderRadius: '12px',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16
          }}>
            <i className="bi bi-check-lg" style={{ color: '#fff', fontSize: '2rem' }}></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0" style={{ color: '#3B2F2F' }}>Order Confirmed</h2>
            <p className="mb-0" style={{ color: '#7a6a58' }}>Thanks for your order! We&#39;re getting it ready.</p>
          </div>
        </div>
        <div className="rounded-4 p-4 mb-4 mx-auto" style={{ background: '#f7ecd6', border: '1px solid #e5e1dc', maxWidth: 600 }}>
          <div className="d-flex justify-content-between mb-2" style={{ fontSize: '1.05em', color: '#3B2F2F' }}>
            <span>Order #</span>
            <span style={{ fontWeight: 600 }}>#{orderDetails.id}</span>
          </div>
          <div className="d-flex justify-content-between mb-2" style={{ fontSize: '1.05em', color: '#3B2F2F' }}>
            <span>Pickup</span>
            <span>{orderDetails.pickup}</span>
          </div>
          <div className="d-flex justify-content-between mb-3" style={{ fontSize: '1.05em', color: '#3B2F2F' }}>
            <span>Contact</span>
            <span>{orderDetails.contact}</span>
          </div>
          <div className="d-flex justify-content-between mb-3" style={{ fontSize: '1.05em', color: '#3B2F2F' }}>
            <span>Name</span>
            <span>{orderDetails.firstName} {orderDetails.lastName}</span>
          </div>
          <div className="d-flex justify-content-between mb-3" style={{ fontSize: '1.05em', color: '#3B2F2F' }}>
            <span>Phone</span>
            <span>{orderDetails.phone}</span>
          </div>
          <hr />
          {orderDetails.items.map(item => (
            <div key={item.uuid || item.id || item.name} className="d-flex align-items-center mb-2 p-2 rounded-3" style={{ background: '#fff' }}>
              <img src={item.image} alt={item.name} style={{ width: 48, height: 48, borderRadius: 8, marginRight: 16, objectFit: 'cover' }} />
              <div className="flex-grow-1">
                <div className="fw-bold" style={{ color: '#3B2F2F' }}>{item.name}</div>
                <div className="text-muted" style={{ fontSize: '0.97em' }}>Qty {item.quantity || 1}</div>
              </div>
              <div className="fw-bold" style={{ color: '#3B2F2F', minWidth: 60, textAlign: 'right' }}>
                ${(item.price * (item.quantity || 1)).toFixed(2)}
              </div>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>${orderDetails.subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Tax</span>
            <span>${orderDetails.tax.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between fw-bold" style={{ fontSize: '1.1em' }}>
            <span>Total</span>
            <span>${orderDetails.total.toFixed(2)}</span>
          </div>
        </div>
        <div className="rounded-4 p-3 mb-4 mx-auto" style={{ background: '#f7ecd6', border: '1px solid #e5e1dc', maxWidth: 600 }}>
          <div className="d-flex align-items-center mb-2" style={{ color: '#7a6a58', fontSize: '1em' }}>
            <i className="bi bi-info-circle me-2"></i>
            Show this order number at pickup. We&#39;ll email you when it&#39;s ready. For delivery, a courier will contact you at the provided phone number.
          </div>
        </div>
        <div className="d-flex gap-3 mx-auto" style={{ maxWidth: 600 }}>
          <button className="btn flex-grow-1" style={{
            background: '#4E6E58',
            color: '#fff',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: '1.1em',
            minWidth: 160
          }}>
            <i className="bi bi-download me-2"></i> Download receipt
          </button>
          <button className="btn flex-grow-1" style={{
            background: '#4E6E58',
            color: '#fff',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: '1.1em',
            minWidth: 120
          }}>
            <i className="bi bi-share me-2"></i> Share
          </button>
          <a href="/" className="btn flex-grow-1" style={{
            background: '#4E6E58',
            color: '#fff',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: '1.1em',
            minWidth: 140,
            textAlign: 'center',
            textDecoration: 'none'
          }}>
            <i className="bi bi-house-door me-2"></i> Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
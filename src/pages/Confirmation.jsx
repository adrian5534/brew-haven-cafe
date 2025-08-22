import React from 'react';

export default function Confirmation({
  orderDetails = {
    id: 'BHC-24715',
    pickup: 'Today, 15 30 mins at counter',
    contact: 'alex@example.com',
    items: [
      { id: 1, name: 'Classic Cappuccino', quantity: 1, price: 4.5, image: '/images/cappuccino.jpg' },
      { id: 2, name: 'Butter Croissant', quantity: 2, price: 3.5, image: '/images/croissant.jpg' },
      { id: 3, name: 'Turkey Avocado', quantity: 1, price: 8.5, image: '/images/turkey-avocado.jpg' },
    ],
    subtotal: 20.0,
    tax: 1.6,
    total: 21.6,
  }
}) {
  return (
    <div style={{ background: '#F5E6CC', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        <nav className="mb-3" style={{ fontSize: '0.98em', color: '#7a6a58' }}>
          <span>Cart</span> <span className="mx-1">/</span> <span>Checkout</span> <span className="mx-1">/</span> <span style={{ color: '#3B2F2F', fontWeight: 600 }}>Confirmation</span>
        </nav>
        <div className="d-flex align-items-center mb-2">
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
        <div className="rounded-4 p-4 mb-4" style={{ background: '#f7ecd6', border: '1px solid #e5e1dc', maxWidth: 600 }}>
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
          <hr />
          {orderDetails.items.map(item => (
            <div key={item.id} className="d-flex align-items-center mb-2 p-2 rounded-3" style={{ background: '#fff' }}>
              <img src={item.image} alt={item.name} style={{ width: 48, height: 48, borderRadius: 8, marginRight: 16, objectFit: 'cover' }} />
              <div className="flex-grow-1">
                <div className="fw-bold" style={{ color: '#3B2F2F' }}>{item.name}</div>
                <div className="text-muted" style={{ fontSize: '0.97em' }}>Qty {item.quantity}</div>
              </div>
              <div className="fw-bold" style={{ color: '#3B2F2F', minWidth: 60, textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
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
        <div className="rounded-4 p-3 mb-4" style={{ background: '#f7ecd6', border: '1px solid #e5e1dc', maxWidth: 600 }}>
          <div className="d-flex align-items-center mb-2" style={{ color: '#7a6a58', fontSize: '1em' }}>
            <i className="bi bi-info-circle me-2"></i>
            Show this order number at pickup. We&#39;ll email you when it&#39;s ready. For delivery, a courier will contact you at the provided phone number.
          </div>
        </div>
        <div className="d-flex gap-3" style={{ maxWidth: 600 }}>
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
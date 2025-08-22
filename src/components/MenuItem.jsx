import React from 'react';

export default function MenuItem({ name, desc, price, image, onAddToCart }) {
  return (
    <div className="card h-100 shadow-sm rounded-4" style={{ background: 'var(--card)', color: 'var(--card-foreground)', border: '1px solid var(--border)' }}>
      <img src={image} className="card-img-top" alt={name} style={{ height: 120, objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title" style={{ color: 'var(--primary)' }}>{name}</h5>
        <p className="card-text text-muted" style={{ color: 'var(--muted-foreground)' }}>{desc}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold" style={{ color: 'var(--primary)' }}>${price.toFixed(2)}</span>
          <button
            className="btn btn-sm"
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
              borderRadius: 8,
              border: 'none'
            }}
            onClick={onAddToCart}
          >
            <i className="bi bi-plus-lg me-1"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
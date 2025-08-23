import React from 'react';

export default function CartPreview({
  cartItems = [],
  onQuantityChange,
  onRemove,
  onViewCart,
  onEdit // <-- add this prop
}) {
  // Safely handle missing or invalid price values
  const total = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  return (
    <div
      className="rounded-4 p-3"
      style={{
        background: 'var(--background, #F5E6CC)',
        border: '1px solid #e5e1dc',
        boxShadow: '0 2px 8px rgba(60, 40, 20, 0.08)'
      }}
    >
      <div className="fw-bold mb-3" style={{ color: 'var(--primary, #4E6E58)', fontSize: '1.1rem' }}>
        Cart Preview
      </div>
      {cartItems.length === 0 ? (
        <div className="text-muted" style={{ color: 'var(--muted-foreground, #7a6a58)' }}>
          Your cart is empty.
        </div>
      ) : (
        <>
          {cartItems.map(item => {
            const price = typeof item.price === 'number' ? item.price : 0;
            return (
              <div
                key={item.uuid}
                className="d-flex align-items-center mb-3 p-2 rounded-3"
                style={{
                  background: '#fff',
                  border: '1px solid #e5e1dc'
                }}
              >
                <img
                  src={item.image || '/image/placeholder.jpg'}
                  alt={item.name || 'Item'}
                  style={{
                    width: 48,
                    height: 48,
                    objectFit: 'cover',
                    borderRadius: 8,
                    marginRight: 12,
                    background: '#f7f7f7',
                    border: '1px solid #e5e1dc'
                  }}
                />
                <div className="flex-grow-1">
                  <div className="fw-bold" style={{ color: '#3B2F2F' }}>{item.name || 'Unnamed Item'}</div>
                  <div className="text-muted" style={{ fontSize: '0.97em', color: '#7a6a58' }}>
                    ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
                  </div>
                  {item.desc && (
                    <div className="text-muted" style={{ fontSize: '0.9em', color: '#a6a6a6' }}>
                      {item.desc}
                    </div>
                  )}
                  {/* Show selected options */}
                  {item.options && Object.keys(item.options).length > 0 && (
                    <div style={{ fontSize: '0.9em', color: '#7a6a58', marginTop: 2 }}>
                      {Object.entries(item.options).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong>{' '}
                          {Array.isArray(value) ? value.join(', ') : value}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Show selected add-ons */}
                  {item.addOns && item.addOns.length > 0 && (
                    <div style={{ fontSize: '0.9em', color: '#7a6a58', marginTop: 2 }}>
                      <strong>Add-ons:</strong>{' '}
                      {item.addOns.map(a => a.name).join(', ')}
                    </div>
                  )}
                  {/* Show note if present */}
                  {item.note && (
                    <div style={{ fontSize: '0.9em', color: '#7a6a58', marginTop: 2 }}>
                      <strong>Note:</strong> {item.note}
                    </div>
                  )}
                  <div className="d-flex align-items-center mt-1">
                    <button
                      className="btn btn-sm"
                      style={{
                        borderRadius: 8,
                        width: 28,
                        height: 28,
                        fontWeight: 600,
                        background: '#F5E6CC',
                        color: '#3B2F2F',
                        border: '1px solid #e5e1dc'
                      }}
                      onClick={() => onQuantityChange(item.uuid, (item.quantity || 1) - 1, item.options, item.addOns, item.note)}
                      disabled={item.quantity <= 1}
                    >-</button>
                    <span className="mx-2" style={{ color: '#3B2F2F', fontWeight: 600 }}>{item.quantity || 1}</span>
                    <button
                      className="btn btn-sm"
                      style={{
                        borderRadius: 8,
                        width: 28,
                        height: 28,
                        fontWeight: 600,
                        background: '#F5E6CC',
                        color: '#3B2F2F',
                        border: '1px solid #e5e1dc'
                      }}
                      onClick={() => onQuantityChange(item.uuid, (item.quantity || 1) + 1, item.options, item.addOns, item.note)}
                    >+</button>
                    {/* Edit button */}
                    {onEdit && (
                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        style={{
                          borderRadius: 8,
                          border: '1px solid #6c757d',
                          color: '#6c757d',
                          background: '#fff'
                        }}
                        onClick={() => onEdit(item)}
                        title="Edit"
                      >✎</button>
                    )}
                  </div>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger ms-2"
                  style={{
                    borderRadius: 8,
                    border: '1px solid #d9534f',
                    color: '#d9534f',
                    background: '#fff'
                  }}
                  onClick={() => onRemove(item.uuid, item.options, item.addOns, item.note)}
                  title="Remove"
                >✕</button>
              </div>
            );
          })}
          <hr />
          <div className="d-flex justify-content-between fw-bold mb-3" style={{ color: '#3B2F2F', fontSize: '1.08em' }}>
            <span>Total</span>
            <span>${typeof total === 'number' ? total.toFixed(2) : '0.00'}</span>
          </div>
          <button
            className="btn w-100"
            style={{
              background: 'var(--primary, #4E6E58)',
              color: '#fff',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: '1.07em',
              boxShadow: '0 2px 8px rgba(60, 40, 20, 0.08)'
            }}
            onClick={onViewCart}
          >
            View Full Cart
          </button>
        </>
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

export default function ItemDetailsModal({
  show,
  onClose,
  item,
  optionsConfig,
  recommendedAddOns,
  onAddToCart,
  initialOptions = {},
  initialAddOns = [],
  initialNote = '',
  initialQuantity = 1,
  isEditing = false,
  onUpdateCartItem // <-- new prop for editing
}) {
  // Pre-fill state if editing an item
  const [quantity, setQuantity] = useState(initialQuantity);
  const [note, setNote] = useState(initialNote);
  const [selectedAddOns, setSelectedAddOns] = useState(initialAddOns);
  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    if (show && item) {
      setQuantity(initialQuantity);
      setNote(initialNote);
      setSelectedAddOns(initialAddOns);
      setOptions(initialOptions);
    }
    // Only run when modal opens for a new item
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, item?.id, item?.uuid]);

  // Subtotal calculation (includes paid options and add-ons)
  let subtotal = typeof item.price === 'number' ? item.price : 0;
  if (optionsConfig) {
    Object.entries(optionsConfig).forEach(([key, config]) => {
      if (config.type === 'radio' && config.options) {
        const selected = config.options.find(opt => opt.value === options[key]);
        if (selected && selected.price) subtotal += selected.price;
      }
      if (config.type === 'dropdown' && config.options) {
        const selected = config.options.find(opt => opt.value === options[key]);
        if (selected && selected.price) subtotal += selected.price;
      }
      if (config.type === 'checkbox' && config.options && options[key]) {
        config.options.forEach(opt => {
          if (options[key].includes(opt.value) && opt.price) subtotal += opt.price;
        });
      }
      if (config.type === 'toggle' && config.options) {
        const selected = config.options.find(opt => opt.value === options[key]);
        if (selected && selected.price) subtotal += selected.price;
      }
    });
  }
  selectedAddOns.forEach(addOn => {
    subtotal += typeof addOn.price === 'number' ? addOn.price : 0;
  });
  subtotal *= quantity;

  // Required options check
  const requiredUnselected = optionsConfig
    ? Object.entries(optionsConfig).some(([key, config]) =>
        config.required && !options[key]
      )
    : false;

  // Add-on toggle
  const handleAddOnToggle = (addOn) => {
    setSelectedAddOns(prev =>
      prev.some(a => a.name === addOn.name)
        ? prev.filter(a => a.name !== addOn.name)
        : [...prev, addOn]
    );
  };

  // Option change
  const handleOptionChange = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  // Add to cart handler: pass all details to parent
  const handleAddToCartClick = () => {
    const cartItem = {
      id: item.id,
      uuid: item.uuid, // <-- include uuid for recommended add-ons and cart items
      name: item.name,
      price: subtotal / quantity, // single item price including options/add-ons
      image: item.image,
      desc: item.desc,
      quantity,
      note,
      options,
      addOns: selectedAddOns
    };
    if (isEditing && onUpdateCartItem) {
      onUpdateCartItem(cartItem);
    } else if (onAddToCart) {
      onAddToCart(cartItem);
    }
    onClose();
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1050
      }}
      tabIndex="-1"
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{
          maxWidth: 900,
          width: '95vw',
          margin: '2rem auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="modal-content"
          style={{
            background: '#F5E6CC',
            color: '#3B2F2F',
            borderRadius: 24,
            border: 'none',
            boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
            padding: 0,
            overflow: 'hidden'
          }}
        >
          <div className="row g-0">
            {/* Left: Large image */}
            <div
              className="col-12 col-md-6"
              style={{
                background: '#F5E6CC',
                minHeight: 340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: '2rem',
                paddingBottom: '2rem'
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '90%',
                  maxWidth: 400,
                  height: 'auto',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: 18,
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  margin: 0
                }}
              />
            </div>
            {/* Right: Content stack */}
            <div className="col-12 col-md-6 p-4 d-flex flex-column" style={{ minHeight: 340 }}>
              {/* Header: Name + Price + Close */}
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h2 className="fw-bold mb-0" style={{ color: '#3B2F2F', fontSize: '2rem' }}>{item.name}</h2>
                <span className="fw-bold" style={{ color: '#3B2F2F', fontSize: '1.3rem', marginLeft: 16 }}>${(typeof item.price === 'number' ? item.price : 0).toFixed(2)}</span>
                <button type="button" className="btn-close ms-2" onClick={onClose}></button>
              </div>
              {/* Badge */}
              {item.badge && (
                <div className="mb-2">
                  <span style={{
                    background: '#4E6E58',
                    color: '#fff',
                    borderRadius: 12,
                    padding: '4px 16px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    display: 'inline-block'
                  }}>
                    {item.badge}
                  </span>
                </div>
              )}
              {/* Description */}
              <div className="mb-3">
                <div style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '12px 16px',
                  fontSize: '1rem',
                  color: '#3B2F2F',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
                }}>
                  {item.desc}
                </div>
              </div>
              {/* Options */}
              {optionsConfig && (
                <div className="mb-3">
                  {Object.entries(optionsConfig).map(([key, config]) => (
                    <div key={key} className="mb-3">
                      <label className="fw-bold mb-2" style={{ color: '#3B2F2F', fontSize: '1rem' }}>{config.label}</label>
                      {/* Toggle */}
                      {config.type === 'toggle' && (
                        <div className="btn-group">
                          {config.options.map(opt => (
                            <button
                              key={opt.value}
                              className={`btn ${options[key] === opt.value ? '' : ''}`}
                              style={{
                                borderRadius: 18,
                                marginRight: 8,
                                background: options[key] === opt.value ? '#4E6E58' : '#fff',
                                color: options[key] === opt.value ? '#fff' : '#3B2F2F',
                                border: options[key] === opt.value ? '2px solid #4E6E58' : '1px solid #ddd',
                                fontWeight: 600,
                                minWidth: 90,
                                padding: '8px 18px'
                              }}
                              onClick={() => handleOptionChange(key, opt.value)}
                            >
                              {opt.label}
                              {opt.price ? <span className="ms-1">+${(typeof opt.price === 'number' ? opt.price : 0).toFixed(2)}</span> : null}
                            </button>
                          ))}
                        </div>
                      )}
                      {/* Radio group */}
                      {config.type === 'radio' && (
                        <div className="d-flex flex-wrap gap-2">
                          {config.options.map(opt => (
                            <button
                              key={opt.value}
                              className="btn"
                              style={{
                                borderRadius: 18,
                                background: options[key] === opt.value ? '#4E6E58' : '#fff',
                                color: options[key] === opt.value ? '#fff' : '#3B2F2F',
                                border: options[key] === opt.value ? '2px solid #4E6E58' : '1px solid #ddd',
                                fontWeight: 600,
                                minWidth: 90,
                                padding: '8px 18px'
                              }}
                              onClick={() => handleOptionChange(key, opt.value)}
                            >
                              {opt.label}
                              {opt.price ? <span className="ms-1">+${(typeof opt.price === 'number' ? opt.price : 0).toFixed(2)}</span> : null}
                            </button>
                          ))}
                        </div>
                      )}
                      {/* Dropdown */}
                      {config.type === 'dropdown' && (
                        <select
                          className="form-select"
                          style={{
                            borderRadius: 12,
                            background: '#fff',
                            color: '#3B2F2F',
                            border: '1px solid #ddd',
                            fontWeight: 500,
                            minWidth: 120
                          }}
                          value={options[key] || ''}
                          onChange={e => handleOptionChange(key, e.target.value)}
                        >
                          <option value="">Select...</option>
                          {config.options.map(opt => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}{opt.price ? ` (+$${(typeof opt.price === 'number' ? opt.price : 0).toFixed(2)})` : ''}
                            </option>
                          ))}
                        </select>
                      )}
                      {/* Checkbox group */}
                      {config.type === 'checkbox' && (
                        <div className="d-flex flex-wrap gap-2">
                          {config.options.map(opt => (
                            <label key={opt.value} className="btn" style={{
                              borderRadius: 18,
                              background: options[key]?.includes(opt.value) ? '#4E6E58' : '#fff',
                              color: options[key]?.includes(opt.value) ? '#fff' : '#3B2F2F',
                              border: options[key]?.includes(opt.value) ? '2px solid #4E6E58' : '1px solid #ddd',
                              fontWeight: 600,
                              minWidth: 90,
                              padding: '8px 18px',
                              cursor: 'pointer'
                            }}>
                              <input
                                type="checkbox"
                                value={opt.value}
                                checked={options[key]?.includes(opt.value) || false}
                                onChange={e => {
                                  const checked = e.target.checked;
                                  setOptions(prev => ({
                                    ...prev,
                                    [key]: checked
                                      ? [...(prev[key] || []), opt.value]
                                      : (prev[key] || []).filter(v => v !== opt.value)
                                  }));
                                }}
                                style={{ display: 'none' }}
                              />
                              {opt.label}
                              {opt.price ? <span className="ms-1">+${(typeof opt.price === 'number' ? opt.price : 0).toFixed(2)}</span> : null}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Quantity stepper */}
              <div className="mb-3">
                <label className="fw-bold mb-2" style={{ color: '#3B2F2F' }}>Quantity</label>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn" style={{
                    borderRadius: 12,
                    fontSize: '1.2rem',
                    width: 40,
                    height: 40,
                    background: '#fff',
                    color: '#3B2F2F',
                    border: '1px solid #ddd'
                  }} onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>-</button>
                  <span className="fw-bold" style={{
                    fontSize: '1.2rem',
                    minWidth: 40,
                    textAlign: 'center',
                    background: '#fff',
                    borderRadius: 8,
                    border: '1px solid #ddd',
                    padding: '4px 0'
                  }}>{quantity}</span>
                  <button className="btn" style={{
                    borderRadius: 12,
                    fontSize: '1.2rem',
                    width: 40,
                    height: 40,
                    background: '#fff',
                    color: '#3B2F2F',
                    border: '1px solid #ddd'
                  }} onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
              </div>
              {/* Special instructions */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  style={{
                    borderRadius: 12,
                    background: '#fff',
                    color: '#3B2F2F',
                    border: '1px solid #ddd',
                    fontWeight: 500
                  }}
                  placeholder="Add a note (optional)"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  maxLength={80}
                />
              </div>
              {/* Info text */}
              <div className="mb-3" style={{ color: '#7a6a58', fontSize: '0.95rem' }}>
                All drinks are served hot. Ask for iced at checkout.
              </div>
              {/* Recommended add-ons */}
              {recommendedAddOns && recommendedAddOns.length > 0 && (
                <div className="mb-3">
                  <label className="fw-bold mb-2" style={{ color: '#3B2F2F' }}>Recommended add-ons</label>
                  <div className="d-flex flex-wrap">
                    {recommendedAddOns.map(addOn => (
                      <label key={addOn.name} className="d-inline-flex align-items-center gap-2 rounded-3 px-2 py-1 me-2 mb-2"
                        style={{
                          background: selectedAddOns.some(a => a.name === addOn.name) ? '#4E6E58' : '#fff',
                          color: selectedAddOns.some(a => a.name === addOn.name) ? '#fff' : '#3B2F2F',
                          cursor: 'pointer',
                          border: selectedAddOns.some(a => a.name === addOn.name) ? '2px solid #4E6E58' : '1px solid #ddd',
                          fontWeight: 600
                        }}>
                        <input
                          type="checkbox"
                          checked={selectedAddOns.some(a => a.name === addOn.name)}
                          onChange={() => handleAddOnToggle(addOn)}
                          style={{ accentColor: '#4E6E58', display: 'none' }}
                        />
                        <img
                          src={addOn.image}
                          alt={addOn.name}
                          style={{
                            width: 32,
                            height: 32,
                            objectFit: 'cover',
                            borderRadius: 6,
                            minWidth: 32,
                            minHeight: 32,
                            maxWidth: 32,
                            maxHeight: 32
                          }}
                        />
                        <span>{addOn.name}</span>
                        <span className="ms-1" style={{ fontSize: '0.95em', fontWeight: 600 }}>${(typeof addOn.price === 'number' ? addOn.price : 0).toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {/* Subtotal row */}
              <div className="mb-4 d-flex justify-content-between align-items-center fw-bold" style={{ fontSize: '1.2rem', color: '#3B2F2F' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {/* Footer buttons */}
              <div className="d-flex flex-wrap gap-2 mt-auto">
                <button
                  className="btn"
                  style={{
                    background: '#fff',
                    color: '#3B2F2F',
                    borderRadius: 16,
                    border: '2px solid #3B2F2F',
                    fontWeight: 600,
                    minWidth: 120
                  }}
                  onClick={onClose}
                >
                  <span style={{ marginRight: 6 }}>✕</span>Cancel
                </button>
                <button
                  className="btn"
                  style={{
                    background: '#6B4226',
                    color: '#fff',
                    borderRadius: 16,
                    fontWeight: 600,
                    minWidth: 140,
                    border: 'none'
                  }}
                  disabled={requiredUnselected}
                  onClick={handleAddToCartClick}
                >
                  <span style={{ marginRight: 6 }}>{isEditing ? '✎' : '🛒'}</span>
                  {isEditing ? 'Update Item' : 'Add to Cart'}
                </button>
                {!isEditing && (
                  <button
                    className="btn btn-link"
                    style={{
                      color: '#3B2F2F',
                      textDecoration: 'underline',
                      fontWeight: 500
                    }}
                    onClick={() => {
                      setQuantity(1);
                      setNote('');
                      setSelectedAddOns([]);
                      setOptions({});
                    }}
                  >
                    Add another item
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Responsive: stack columns on mobile */}
      <style>
        {`
          @media (max-width: 767.98px) {
            .modal-dialog {
              max-width: 98vw !important;
            }
            .modal-content {
              border-radius: 0.75rem !important;
            }
            .row.g-0 {
              flex-direction: column !important;
              display: flex !important;
            }
            .col-md-6 {
              width: 100% !important;
              max-width: 100% !important;
              padding: 1.25rem !important;
              justify-content: center !important;
              align-items: center !important;
            }
            .col-md-6 img {
              width: 100% !important;
              height: auto !important;
              min-height: 220px !important;
              max-height: 320px !important;
              border-radius: 12px !important;
            }
            label.d-inline-flex img {
              width: 32px !important;
              height: 32px !important;
              min-width: 32px !important;
              min-height: 32px !important;
              max-width: 32px !important;
              max-height: 32px !important;
              object-fit: cover !important;
              border-radius: 6px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
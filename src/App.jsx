import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPreview from './components/CartPreview';
import ItemDetailsModal from './components/ItemDetailsModal';
import routes from './routes/routes';

// Import menu and options config
import menuData from './menu.json';
import optionsConfigData from './optionsConfig.json';

// Helper: Find item category and optionsConfig
function getOptionsConfigForItem(item) {
  for (const [category, items] of Object.entries(menuData)) {
    const found = items.find(i => i.name === item.name);
    if (found) {
      if (category === 'Coffee') return optionsConfigData['Drink'];
      if (category === 'Sandwiches') return optionsConfigData['Sandwich'];
      if (category === 'Pastries') return optionsConfigData['Pastry'];
    }
  }
  return {};
}

// Helper: Get recommended add-ons based on cart categories, random, and only update when categories change
function getRecommendedAddOns(cartCategories, menuData) {
  function shuffle(array) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  const allCategories = Object.keys(menuData);
  const notInCart = allCategories.filter(cat => !cartCategories.includes(cat));
  let pool = [];
  notInCart.forEach(cat => {
    pool = pool.concat(menuData[cat]);
  });
  return shuffle(pool).slice(0, 2).map(item => ({ ...item, selected: false }));
}

function App() {
  const navigate = useNavigate();

  // Global cart state
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    itemsCount: 0,
    itemsTotal: 0,
    subtotal: 0,
    taxes: 0,
    fee: 0,
    savings: 0,
    total: 0,
    promo: 'BREWHAVEN20' // prefilled promo code
  });

  // Cart drawer state
  const [cartOpen, setCartOpen] = useState(false);

  // Edit modal state
  const [editingItem, setEditingItem] = useState(null);
  const [editingOriginalItem, setEditingOriginalItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Recommended add-ons state
  const [recommended, setRecommended] = useState([]);

  // Extract cart categories to a variable for stable dependency
  const cartCategories = useMemo(
    () => Array.from(new Set(cartItems.map(item => item.category))),
    [cartItems]
  );
  // Create a stable string for dependency
  const cartCategoriesString = cartCategories.join(',');

  // Only update recommended when cartCategories change
  useEffect(() => {
    setRecommended(getRecommendedAddOns(cartCategories, menuData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartCategoriesString]);

  // Edit logic
  const handleEditCartItem = (item) => {
    setEditingItem(item);
    setEditingOriginalItem(item);
    setShowEditModal(true);
  };

  const handleUpdateCartItem = (updatedItem) => {
    setCartItems(items =>
      items.map(i =>
        i.id === editingOriginalItem.id &&
        JSON.stringify(i.options) === JSON.stringify(editingOriginalItem.options) &&
        JSON.stringify(i.addOns) === JSON.stringify(editingOriginalItem.addOns) &&
        (i.note || '') === (editingOriginalItem.note || '')
          ? updatedItem
          : i
      )
    );
    setShowEditModal(false);
    setEditingItem(null);
    setEditingOriginalItem(null);
  };

  // Cart handlers
  const handleAddToCart = item => {
    setCartItems(prev => {
      const itemKey = JSON.stringify({
        id: item.id,
        options: item.options,
        addOns: item.addOns,
        note: item.note
      });
      const exists = prev.find(i =>
        JSON.stringify({
          id: i.id,
          options: i.options,
          addOns: i.addOns,
          note: i.note
        }) === itemKey
      );
      if (exists) {
        return prev.map(i =>
          JSON.stringify({
            id: i.id,
            options: i.options,
            addOns: i.addOns,
            note: i.note
          }) === itemKey
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1, desc: item.desc || '' }];
    });
  };

  const handleQuantityChange = (id, qty, options, addOns, note) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id &&
        JSON.stringify(item.options) === JSON.stringify(options) &&
        JSON.stringify(item.addOns) === JSON.stringify(addOns) &&
        item.note === note
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      )
    );
  };

  const handleRemove = (id, options, addOns, note) => {
    setCartItems(items =>
      items.filter(item =>
        !(item.id === id &&
          JSON.stringify(item.options) === JSON.stringify(options) &&
          JSON.stringify(item.addOns) === JSON.stringify(addOns) &&
          item.note === note)
      )
    );
  };

  const handleClearCart = () => setCartItems([]);

  // Toggle recommended add-on selection
  const handleAddRecommended = (addOnIdOrName) => {
    setRecommended(recommended =>
      recommended.map(addOn =>
        (addOn.id === addOnIdOrName || addOn.name === addOnIdOrName)
          ? { ...addOn, selected: !addOn.selected }
          : addOn
      )
    );
  };

  const handleApplyPromo = code => {
    setOrderSummary(summary => ({ ...summary, promo: code }));
  };
  const handleCheckout = () => {
    navigate('/checkout');
  };
  const handleContinueShopping = () => {
    navigate('/');
  };

  // Cart count for Navbar
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  // Props to pass to pages
  const sharedProps = {
    cartItems,
    recommended,
    orderSummary,
    handleAddToCart,
    handleQuantityChange,
    handleRemove,
    handleClearCart,
    handleAddRecommended,
    handleApplyPromo,
    handleCheckout,
    handleContinueShopping,
    handleEditCartItem, // Pass edit handler
  };

  // Update order summary when cart changes or promo changes or recommended add-ons change
  useEffect(() => {
    const itemsCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    // Include selected recommended add-ons in total
    const selectedAddOnsTotal = recommended
      .filter(addOn => addOn.selected)
      .reduce((sum, addOn) => sum + (addOn.price || 0), 0);
    const itemsTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0) + selectedAddOnsTotal;
    const subtotal = itemsTotal;
    const taxes = subtotal * 0.08;
    const fee = subtotal > 0 ? 1.5 : 0;
    let savings = 0;
    if (orderSummary.promo === 'BREWHAVEN20') {
      savings = subtotal * 0.20;
    }
    const total = subtotal + taxes + fee - savings;
    setOrderSummary(summary => ({
      ...summary,
      itemsCount,
      itemsTotal,
      subtotal,
      taxes,
      fee,
      savings,
      total
    }));
  }, [cartItems, recommended, orderSummary.promo]);

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      {/* Cart Drawer */}
      {cartOpen && (
        <div
          className="cart-drawer-overlay"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(0,0,0,0.25)',
            zIndex: 1050
          }}
          onClick={() => setCartOpen(false)}
        >
          <div
            className="cart-drawer"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '400px',
              maxWidth: '100vw',
              height: '100%',
              background: '#fff',
              boxShadow: '-2px 0 16px rgba(0,0,0,0.12)',
              zIndex: 1060,
              padding: '2rem 1.5rem',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">Your Cart</h4>
              <button className="btn btn-sm btn-outline-dark" onClick={() => setCartOpen(false)}>✕</button>
            </div>
            <CartPreview
              cartItems={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              onViewCart={() => {
                setCartOpen(false);
                navigate('/cart');
              }}
              onEdit={handleEditCartItem}
            />
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {showEditModal && editingItem && (
        <ItemDetailsModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          item={editingItem}
          optionsConfig={getOptionsConfigForItem(editingItem)}
          recommendedAddOns={recommended}
          initialOptions={editingItem.options}
          initialAddOns={editingItem.addOns}
          initialNote={editingItem.note}
          initialQuantity={editingItem.quantity}
          isEditing={true}
          onUpdateCartItem={handleUpdateCartItem}
        />
      )}
      <Routes>
        {routes.map(({ path, element }, idx) => (
          <Route
            key={idx}
            path={path}
            element={React.cloneElement(element, sharedProps)}
          />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
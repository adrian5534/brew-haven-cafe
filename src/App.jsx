import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPreview from './components/CartPreview';
import ItemDetailsModal from './components/ItemDetailsModal';
import routes from './routes/routes';

import menuData from './menu.json';
import optionsConfigData from './optionsConfig.json';
import { v4 as uuidv4 } from 'uuid';

// Helper: Find item optionsConfig using type if present, fallback to category/name
function getOptionsConfigForItem(item) {
  if (item && item.type && optionsConfigData[item.type]) {
    return optionsConfigData[item.type];
  }
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
  // Assign a uuid to each recommended add-on
  return shuffle(pool).slice(0, 2).map(item => ({
    ...item,
    selected: false,
    uuid: uuidv4()
  }));
}

// Helper: Remove duplicates from recommended add-ons (by uuid)
function dedupeRecommended(recommended) {
  const seen = new Set();
  return recommended.filter(addOn => {
    const key = addOn.uuid;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function App() {
  const navigate = useNavigate();

  // Global cart state (persisted in localStorage)
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [orderSummary, setOrderSummary] = useState({
    itemsCount: 0,
    itemsTotal: 0,
    subtotal: 0,
    taxes: 0,
    fee: 0,
    savings: 0,
    total: 0,
    promo: 'BREWHAVEN20'
  });

  // Persist cartItems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart drawer state
  const [cartOpen, setCartOpen] = useState(false);

  // Edit modal state for cart items
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Edit modal state for recommended add-ons
  const [editingAddOn, setEditingAddOn] = useState(null);
  const [showEditAddOnModal, setShowEditAddOnModal] = useState(false);

  // Recommended add-ons state
  const [recommended, setRecommended] = useState([]);

  // Extract cart categories to a variable for stable dependency
  const cartCategories = useMemo(
    () => Array.from(new Set(cartItems.map(item => item.category))),
    [cartItems]
  );
  const cartCategoriesString = cartCategories.join(',');

  // Only update recommended when cartCategories change
  useEffect(() => {
    const rawRecommended = getRecommendedAddOns(cartCategories, menuData);
    setRecommended(dedupeRecommended(rawRecommended));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartCategoriesString]);

  // Edit logic for cart drawer
  const handleEditCartItem = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  // Update cart item with new options/addOns/note/quantity
  const handleUpdateCartItem = (updatedItem) => {
    setCartItems(items =>
      items.map(i =>
        i.uuid === updatedItem.uuid
          ? { ...i, ...updatedItem }
          : i
      )
    );
    setShowEditModal(false);
    setEditingItem(null);
  };

  // Edit recommended add-on handler (match by uuid)
  const handleEditRecommended = (updatedAddOn) => {
    setRecommended(recommended =>
      recommended.map(addOn =>
        addOn.uuid === updatedAddOn.uuid
          ? { ...addOn, ...updatedAddOn }
          : addOn
      )
    );
    setShowEditAddOnModal(false);
    setEditingAddOn(null);
  };

  // Edit logic for recommended add-ons
  const handleEditAddOn = (addOn) => {
    setEditingAddOn(addOn);
    setShowEditAddOnModal(true);
  };

  // Cart handlers
  const handleAddToCart = item => {
    let type = item.type;
    if (!type) {
      if (item.category === 'Coffee') type = 'Drink';
      else if (item.category === 'Sandwiches') type = 'Sandwich';
      else if (item.category === 'Pastries') type = 'Pastry';
    }
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
      return [
        ...prev,
        {
          ...item,
          quantity: item.quantity || 1,
          desc: item.desc || '',
          type,
          uuid: uuidv4() // <-- assign uuid to each cart item
        }
      ];
    });
  };

  const handleQuantityChange = (uuid, qty, options, addOns, note) => {
    setCartItems(items =>
      items.map(item =>
        item.uuid === uuid &&
        JSON.stringify(item.options) === JSON.stringify(options) &&
        JSON.stringify(item.addOns) === JSON.stringify(addOns) &&
        item.note === note
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      )
    );
  };

  const handleRemove = (uuid, options, addOns, note) => {
    setCartItems(items =>
      items.filter(item =>
        !(item.uuid === uuid &&
          JSON.stringify(item.options) === JSON.stringify(options) &&
          JSON.stringify(item.addOns) === JSON.stringify(addOns) &&
          item.note === note)
      )
    );
  };

  const handleClearCart = () => setCartItems([]);

  // Toggle recommended add-on selection (match by uuid)
  const handleAddRecommended = (addOnUuid) => {
    setRecommended(recommended =>
      recommended.map(addOn =>
        addOn.uuid === addOnUuid
          ? { ...addOn, selected: !addOn.selected }
          : addOn
      )
    );
  };

  const handleApplyPromo = code => {
    setOrderSummary(summary => ({ ...summary, promo: code }));
  };

  // Do NOT clear cart here! Only navigate to checkout.
  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

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
    handleEditCartItem,
    handleUpdateCartItem,
    handleEditRecommended,
    handleEditAddOn,
    editingAddOn,
    showEditAddOnModal,
    setShowEditAddOnModal,
    setEditingAddOn,
    setCartItems, // Pass setCartItems for confirmation page
  };

  useEffect(() => {
    const itemsCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
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
      {/* Edit Modal for Cart Item */}
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
      {/* Edit Modal for Recommended Add-on */}
      {showEditAddOnModal && editingAddOn && (
        <ItemDetailsModal
          show={showEditAddOnModal}
          onClose={() => setShowEditAddOnModal(false)}
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
import React, { useState } from 'react';
import menuData from '../menu.json';
import MenuItem from '../components/MenuItem';
import ItemDetailsModal from '../components/ItemDetailsModal';
import optionsConfig from '../optionsConfig.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

// Map menu categories to option config keys
const categoryMap = {
  Coffee: 'Drink',
  Sandwiches: 'Sandwich',
  Pastries: 'Pastry'
};

const categories = Object.keys(menuData);
const filterOptions = ['All', ...categories];

export default function Menu({ handleAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Modal close handler
  const handleClose = () => {
    setSelectedItem(null);
    setSelectedCategory(null);
  };

  // Pass onClick to MenuItem
  const handleItemClick = (item, category) => {
    setSelectedItem(item);
    setSelectedCategory(category);
  };

  // Recommended add-ons logic (example)
  function getRecommendedAddOns(category) {
    if (category === 'Coffee') return menuData.Pastries?.slice(0, 2) || [];
    if (category === 'Sandwiches') return menuData.Coffee?.slice(0, 2) || [];
    if (category === 'Pastries') return menuData.Coffee?.slice(0, 2) || [];
    return [];
  }

  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh' }}>
      <div className="container py-4">
        <h1 className="fw-bold" style={{ color: 'var(--primary)' }}>Menu</h1>
        <p className="text-muted mb-4" style={{ color: 'var(--muted-foreground)' }}>
          Cozy classics and fresh bakes, crafted daily.
        </p>
        <div className="mb-4 d-flex flex-wrap gap-2">
          {filterOptions.map(option => (
            <button
              key={option}
              className={`btn ${activeCategory === option ? 'btn-success' : 'btn-light'}`}
              style={{
                borderRadius: 20,
                background: activeCategory === option ? 'var(--primary)' : 'var(--muted)',
                color: activeCategory === option ? 'var(--background)' : 'var(--foreground)',
                border: 'none'
              }}
              onClick={() => setActiveCategory(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {activeCategory === 'All'
          ? categories.map(category => (
              <div key={category} className="mb-5">
                <h3 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>{category}</h3>
                <div className="row g-4">
                  {menuData[category].map((item, idx) => (
                    <div className="col-12 col-md-6 col-lg-3" key={idx}>
                      <div onClick={() => handleItemClick(item, category)} style={{ cursor: 'pointer' }}>
                        <MenuItem {...item} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : (
              <div className="mb-5">
                <h3 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>{activeCategory}</h3>
                <div className="row g-4">
                  {menuData[activeCategory].map((item, idx) => (
                    <div className="col-12 col-md-6 col-lg-3" key={idx}>
                      <div onClick={() => handleItemClick(item, activeCategory)} style={{ cursor: 'pointer' }}>
                        <MenuItem {...item} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
        }
        {/* Use the universal modal and pass mapped optionsConfig and recommendedAddOns */}
        {selectedItem && selectedCategory && (
          <ItemDetailsModal
            show={!!selectedItem}
            onClose={handleClose}
            item={selectedItem}
            category={selectedCategory}
            optionsConfig={optionsConfig[categoryMap[selectedCategory]]}
            recommendedAddOns={getRecommendedAddOns(selectedCategory)}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
}
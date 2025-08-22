import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import ItemDetailsModal from '../components/ItemDetailsModal';
import menuData from '../menu.json';
import optionsConfigData from '../optionsConfig.json';

function getOptionsConfigForItem(item) {
  for (const [category, items] of Object.entries(menuData)) {
    if (item.name && items.find(i => i.name === item.name)) {
      if (category === 'Coffee') return optionsConfigData['Drink'];
      if (category === 'Sandwiches') return optionsConfigData['Sandwich'];
      if (category === 'Pastries') return optionsConfigData['Pastry'];
    }
  }
  return {};
}

function Home({ handleAddToCart, recommendedAddOns = [] }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const featuredDrinks = [
    {
      img: '/image/cappuccino.jpg', name: 'Classic Cappuccino', desc: 'Rich espresso, velvety foam', price: '$4.50'
    },
    {
      img: '/image/vanilla-latte.jpg', name: 'Iced Vanilla Latte', desc: 'Cold, smooth, slightly sweet', price: '$5.25'
    },
    {
      img: '/image/matcha.jpg', name: 'Matcha Latte', desc: 'Stone-ground matcha, creamy finish', price: '$5.00'
    },
    {
      img: '/image/mocha.jpg', name: 'Mocha Delight', desc: 'Espresso with rich cocoa', price: '$5.25'
    },
    {
      img: '/image/chai.jpg', name: 'Spiced Chai Latte', desc: 'Aromatic spices, cozy warmth', price: '$4.75'
    },
    {
      img: '/image/coldbrew.jpg', name: 'Cold Brew', desc: 'Slow-steeped, smooth and bold', price: '$4.95'
    }
  ];

  const handleShowModal = (drink, i) => {
    setSelectedItem({
      id: `featured-${i}`,
      name: drink.name,
      price: Number(drink.price.replace('$', '')),
      image: drink.img,
      desc: drink.desc,
      quantity: 1
    });
    setShowModal(true);
  };

  const handleModalAddToCart = (item) => {
    handleAddToCart(item);
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div style={{
      background: 'var(--background)',
      color: 'var(--foreground)',
      minHeight: '100vh',
      padding: '6rem',
      paddingBottom: '6rem'
    }}>
      {/* Hero Section */}
      <section className="container my-4">
        <div
          className="rounded-4 overflow-hidden position-relative"
          style={{ background: 'var(--card)', minHeight: 480 }}
        >
          <img
            src='/image/latte.png'
            alt="Latte art"
            className="w-100 h-100 position-absolute top-0 start-0"
            style={{ objectFit: 'cover', opacity: 1.0 , filter: 'brightness(30%)'}}
          />
          <div className="position-relative text-center py-5" style={{ zIndex: 2 }}>
            <button className="bi bi-cup-hot btn btn-light mb-3" style={{ borderRadius: 20, background: 'var(--secondary)', color: 'var(--background)', border: 'none' }}>
              Family Owned Café
            </button>
            <h1 className="fw-bold" style={{ color: 'var(--background)' }}>
              Where Every Cup Feels Like Home.
            </h1>
            <p className="mb-4" style={{ color: 'var(--background)' }}>
              Discover small-batch roasts, artisan pastries, and a cozy corner to unwind. Your neighborhood spot for slow mornings and warm conversations.
            </p>
            <button
              className="btn px-4 py-2"
              style={{
                borderRadius: 20,
                background: 'var(--secondary)',
                color: 'var(--background)',
                border: 'none',
              }}
            >
              <i className="bi bi-bag me-2" style={{ color: 'var(--background)' }}></i>Order Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Drinks */}
      <section className="container my-5">
        <h2 className="fw-bold" style={{ color: 'var(--primary)' }}>Featured Drinks</h2>
        <p className="text-muted" style={{ color: 'var(--muted-foreground)' }}>Our most-loved sips from the bar.</p>
        <div className="row g-4">
          {featuredDrinks.map((drink, i) => (
            <div className="col-12 col-md-4" key={i}>
              <div className="card h-100 shadow-sm rounded-4" style={{ background: 'var(--card)', color: 'var(--card-foreground)', border: '1px solid var(--border)' }}>
                <img src={drink.img} className="card-img-top" alt={drink.name} style={{ height: 140, objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'var(--primary)' }}>{drink.name}</h5>
                  <p className="card-text text-muted" style={{ color: 'var(--muted-foreground)' }}>{drink.desc}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold" style={{ color: 'var(--primary)' }}>{drink.price}</span>
                    <button
                      className="btn btn-sm"
                      style={{
                        background: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                        borderRadius: 8,
                        border: 'none',
                      }}
                      onClick={() => handleShowModal(drink, i)}
                    >
                      <i className="bi bi-plus-lg me-1"></i>View & Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container my-5">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="rounded-4 p-4 h-100" style={{ background: 'var(--card)', color: 'var(--card-foreground)', border: '1px solid var(--border)' }}>
              <h3 className="fw-bold" style={{ color: 'var(--primary)' }}>About Brew Haven</h3>
              <p className="text-muted mb-0" style={{ color: 'var(--muted-foreground)' }}>
                A neighborhood café crafted for comfort.<br /><br />
                We source ethically-grown beans and bake fresh pastries every morning. Whether you’re catching up with friends or finding a quiet nook to read, our space is designed to feel like home—warm, welcoming, and full of the aroma of great coffee.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <img src="/image/about.jpg" alt="Cafe interior" className="w-100 rounded-4 h-100" style={{ objectFit: 'cover', minHeight: 220 }} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container my-5">
        <h3 className="fw-bold" style={{ color: 'var(--primary)' }}>What Our Guests Say</h3>
        <p className="text-muted" style={{ color: 'var(--muted-foreground)' }}>Real words from our community.</p>
        <div className="row g-4">
          {[
            {
              name: 'Ava Thompson',
              img: '/image/ava.jpg',
              text: 'The cappuccino is perfection and the vibe is so cozy—I could spend hours here.'
            },
            {
              name: 'Michael Chen',
              img: '/image/michael.jpg',
              text: 'Love their matcha latte and the friendly staff. It’s my go-to spot after work.'
            },
            {
              name: 'Sofia Reyes',
              img: '/image/sofia.jpg',
              text: 'The pastries are incredible and the seating is super comfortable. Highly recommend!'
            }
          ].map((guest, i) => (
            <div className="col-12 col-md-4" key={i}>
              <div className="rounded-4 p-3 h-100 d-flex flex-column" style={{ background: 'var(--card)', color: 'var(--card-foreground)', border: '1px solid var(--border)' }}>
                <div className="d-flex align-items-center mb-2">
                  <img src={guest.img} alt={guest.name} className="rounded-circle me-2" style={{ width: 36, height: 36, objectFit: 'cover' }} />
                  <span className="fw-bold" style={{ color: 'var(--primary)' }}>{guest.name}</span>
                </div>
                <span className="text-muted" style={{ color: 'var(--muted-foreground)' }}>{guest.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Item Details Modal */}
      {showModal && selectedItem && (
        <ItemDetailsModal
          show={showModal}
          onClose={() => { setShowModal(false); setSelectedItem(null); }}
          item={selectedItem}
          optionsConfig={getOptionsConfigForItem(selectedItem)}
          recommendedAddOns={recommendedAddOns} // <-- now passed from props
          initialOptions={{}}
          initialAddOns={[]}
          initialNote=""
          initialQuantity={1}
          isEditing={false}
          onAddToCart={handleModalAddToCart}
        />
      )}
    </div>
  );
}

export default Home;
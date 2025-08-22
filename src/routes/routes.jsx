import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Menu from '../pages/Menu';
import CartPage from '../pages/Cart'; // <-- Add this import
import Checkout from '../pages/Checkout';
import Confirmation from '../pages/Confirmation';

const routes = [
  {
    path: '/',
    element: <Home />,
    meta: {
      title: 'Home',
      description: 'Welcome to Brew Haven Café',
    },
  },
  {
    path: '/about',
    element: <About />,
    meta: {
      title: 'About',
      description: 'Learn more about Brew Haven Café',
    },
  },
  {
    path: '/contact',
    element: <Contact />,
    meta: {
      title: 'Contact',
      description: 'Contact Brew Haven Café',
    },
  },
  {
    path: '/menu',
    element: <Menu />,
    meta: {
      title: 'Menu',
      description: 'Explore the Brew Haven Café menu',
    },
  },
  {
    path: '/cart',
    element: <CartPage />, // <-- Add this route
    meta: {
      title: 'Cart',
      description: 'View your cart and checkout',
    },
  },
  {
    path: '/checkout',
    element: <Checkout />,
    meta: {
      title: 'Checkout',
      description: 'Complete your order and payment',
    },
  },
  {
    path: '/confirmation',
    element: <Confirmation />,
    meta: {
      title: 'Confirmation',
      description: 'Order confirmation and details',
    },
  },
  // Add other routes here with meta
];

export default routes;
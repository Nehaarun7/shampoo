import { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderHistoryProvider } from "./context/OrderHistoryContext";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Wishlist from "./components/Wishlist";
import OrderHistory from "./components/OrderHistory";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  // Single source of truth for body scroll lock
  useEffect(() => {
    const anyOpen = cartOpen || checkoutOpen || wishlistOpen || ordersOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, checkoutOpen, wishlistOpen, ordersOpen]);

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <OrderHistoryProvider>
      <WishlistProvider>
        <CartProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <Navbar
            onCartOpen={() => setCartOpen(true)}
            onWishlistOpen={() => setWishlistOpen(true)}
            onOrdersOpen={() => setOrdersOpen(true)}
            onNavClick={scrollToSection}
            onShopNow={() => {
              scrollToSection("collection");
              setCartOpen(false);
            }}
          />

          <Home />

          <Footer onNavClick={scrollToSection} />

          <Cart
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            onCheckout={handleCheckout}
          />

          <Wishlist
            isOpen={wishlistOpen}
            onClose={() => setWishlistOpen(false)}
          />

          <OrderHistory
            isOpen={ordersOpen}
            onClose={() => setOrdersOpen(false)}
          />

          <Checkout
            isOpen={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
          />
        </CartProvider>
      </WishlistProvider>
    </OrderHistoryProvider>
  );
}

export default App;

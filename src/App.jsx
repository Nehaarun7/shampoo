import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <CartProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar
        onCartOpen={() => setCartOpen(true)}
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

      <Checkout
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </CartProvider>
  );
}

export default App;

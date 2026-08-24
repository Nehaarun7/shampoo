import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar
        onCartOpen={() => setCartOpen(true)}
        onNavClick={scrollToSection}
      />

      <Home />

      <Footer onNavClick={scrollToSection} />

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import './App.css'; 
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === product._id);
      if (existing) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  const handleUpdateQuantity = (productId, delta) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };
  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };
  const [user, setUser] = useState(null);
  const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
  };

  useEffect(() => {
    console.log("🛒 Cart updated:", cart);
  }, [cart]);

  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    setUser(JSON.parse(savedUser)); // parse string to object
  }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
        <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        <Link to="/shop" style={{ margin: "0 10px" }}>Shop</Link>
        <Link to="/cart" style={{ margin: "0 10px" }}>
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </Link>
        {user ? (
          <>
            <span style={{ margin: "0 10px" }}>Hello, {user.email}</span>
            <button onClick={handleLogout} style={{ margin: "0 10px" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ margin: "0 10px" }}>Login</Link>
            <Link to="/signup" style={{ margin: "0 10px" }}>Sign Up</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop user={user} onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={user ? <Cart cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveFromCart} /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={user ? <Checkout cart={cart} /> : <Navigate to="/login" replace state={{ fromProtected: true }} /> } />

      </Routes>
    </Router>
  );
}

export default App;

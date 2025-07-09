import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Shop({ user, onAddToCart }) {
  console.log("👤 User in Shop.jsx:", user);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5050/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    if (!user) return; // Only log if user is logged in

    products.forEach(product => {
      fetch("http://127.0.0.1:5050/api/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
          action: "view"
        })
      }).catch(err => console.error("Interaction logging error:", err));
    });
  }, [products, user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Shop</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

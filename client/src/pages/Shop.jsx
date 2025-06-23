import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Shop({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5050/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

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

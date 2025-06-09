import { useEffect, useState } from "react";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/products") // 🔄 Use your backend port
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shop All Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map(product => (
          <div key={product._id} style={{
            border: "1px solid #ddd",
            padding: "10px",
            width: "200px"
          }}>
            <img src={product.imageUrl} alt={product.name} width="100%" />
            <h4>{product.name}</h4>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

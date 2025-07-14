import React, { useState } from "react";

export default function Checkout({ user, cart, setCart }) {
  console.log("✅ user:", user);
  console.log("🛒 cart:", cart);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    console.log("🧾 Place Order button clicked");

    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    cart.forEach(item => {
      fetch("http://127.0.0.1:5050/api/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: item._id,
          action: "purchase"
        })
      }).catch(err => console.error("Purchase logging failed:", err));
    });

    alert("✅ Order placed!");
    setCart([]); // optional: clear cart
    localStorage.removeItem("cart"); // optional: clear from localStorage
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Checkout</h2>

      <h3>Order Summary</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.map(item => (
          <li key={item._id} style={{ marginBottom: "1rem" }}>
            {item.name} — ${item.price} × {item.quantity} = <strong>${item.price * item.quantity}</strong>
          </li>
        ))}
      </ul>
      <h4>Total: ${total.toFixed(2)}</h4>

      <hr />

      <h3>Shipping Info</h3>
      <form onSubmit={handlePlaceOrder}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "300px" }}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "300px" }}
        />
        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
          rows={4}
          style={{ display: "block", margin: "10px 0", width: "300px" }}
        />
        <button onClick={handlePlaceOrder}>Place Order</button>
      </form>
    </div>
  );
}

import React, { useState } from "react";

export default function Checkout({ cart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    console.log("Order placed:", { name, email, address, cart });
    alert("✅ Order placed (mock)!");
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
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

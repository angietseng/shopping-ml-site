import React from "react";

export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Cart</h2>
      
      {cart.length === 0 ? (
        <p>Your cart is empty 🛍️</p>
      ) : (
        <div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map(item => (
              <li key={item._id} className="cart-item">
                <strong>{item.name}</strong><br />
                ${item.price} × {item.quantity} = <strong>${item.price * item.quantity}</strong>
              </li>
            ))}
          </ul>

          <hr />
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

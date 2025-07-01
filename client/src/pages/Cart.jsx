import React from "react";

export default function Cart({ cart, onUpdateQuantity, onRemoveItem }) {
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
              <li key={item._id} className="cart-item" style={{ marginBottom: "1.5rem" }}>
                <strong>{item.name}</strong><br />
                ${item.price} × {item.quantity} = <strong>${item.price * item.quantity}</strong><br />

                {/* Buttons */}
                <button onClick={() => onUpdateQuantity(item._id, -1)} disabled={item.quantity <= 1}>
                  –
                </button>
                <span style={{ margin: "0 0.5rem" }}>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item._id, 1)}>+</button>
                <button
                  onClick={() => onRemoveItem(item._id)}
                  style={{ marginLeft: "1rem", color: "red", background: "none", border: "none", cursor: "pointer" }}
                >
                  Remove
                </button>
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

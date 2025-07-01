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
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item._id} className="cart-item">
                <div className="cart-left">
                  <strong>{item.name}</strong>
                  <div>${item.price} × {item.quantity} = ${item.price * item.quantity}</div>
                </div>

                <div className="cart-right">
                  <button onClick={() => onUpdateQuantity(item._id, -1)} disabled={item.quantity <= 1}>–</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item._id, 1)}>+</button>
                  <button onClick={() => onRemoveItem(item._id)} className="remove-btn">Remove</button>
                </div>
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

import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const redirected = location.state?.fromProtected;

  {redirected && <p style={{ color: "red" }}>Please log in to access that page.</p>}

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const mockUser = { email }; // in real app you'd get this from a server

    localStorage.setItem("user", JSON.stringify(mockUser)); // save to browser
    window.location.href = "/"; // refresh or redirect after login
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0" }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

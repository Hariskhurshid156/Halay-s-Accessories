import { useEffect, useState } from 'react';
import { getProducts } from './api.js';

const money = (n) => `$${n.toFixed(2)}`;

export default function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [cart, setCart] = useState({}); // { productId: qty }
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts).catch((e) => setError(e.message));
  }, []);

  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id) =>
    setCart((c) => {
      const { [id]: qty, ...rest } = c;
      return qty > 1 ? { ...rest, [id]: qty - 1 } : rest;
    });

  const lines = products.filter((p) => cart[p.id]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = lines.reduce((sum, p) => sum + p.price * cart[p.id], 0);

  return (
    <>
      <header className="header">
        <h1>Halay's Accessories</h1>
        <button className="cart-btn" onClick={() => setOpen(!open)}>
          🛒 Cart ({count})
        </button>
      </header>

      <main>
        <section className="hero">
          <h2>Gear up with Halay's</h2>
          <p>Smart watches, headphones and caps — simple and stylish.</p>
        </section>

        {error && <p className="error">{error}</p>}

        <section className="grid">
          {products.map((p) => (
            <article className="card" key={p.id}>
              <div className="thumb" style={{ background: p.color }}>
                <span>{p.emoji}</span>
              </div>
              <h3>{p.name}</h3>
              <p className="desc">{p.description}</p>
              <div className="row">
                <strong>{money(p.price)}</strong>
                <button onClick={() => add(p.id)}>Add to cart</button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {open && (
        <aside className="cart">
          <h2>Your cart</h2>
          {lines.length === 0 && <p>Your cart is empty.</p>}
          {lines.map((p) => (
            <div className="line" key={p.id}>
              <span>
                {p.emoji} {p.name} × {cart[p.id]}
              </span>
              <span>
                {money(p.price * cart[p.id])}
                <button className="small" onClick={() => remove(p.id)}>
                  −
                </button>
              </span>
            </div>
          ))}
          <div className="line total">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
          <button className="checkout" disabled={!count} onClick={() => alert('Checkout coming soon!')}>
            Checkout
          </button>
        </aside>
      )}

      <footer>© {new Date().getFullYear()} Halay's Accessories</footer>
    </>
  );
}

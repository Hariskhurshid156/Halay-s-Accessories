import { dummyProducts } from './data.js';

// Set VITE_API_URL (e.g. https://api.example.com) once the backend is deployed.
// While it is empty the app serves the dummy data.
const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
  if (!API_URL) return dummyProducts;
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to load products');
  const items = await res.json();
  // Decorate API items with display fields the dummy data carries.
  return items.map((p) => ({
    ...(dummyProducts.find((d) => d.id === p.id) ?? {}),
    ...p,
  }));
}

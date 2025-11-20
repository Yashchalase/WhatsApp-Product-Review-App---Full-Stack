import React, { useEffect, useState } from "react";

export default function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchReviews() {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Product Reviews (WhatsApp)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Name</th>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Product</th>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Review</th>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r.id}>
                <td style={{ padding: 8, borderBottom: "1px solid #f2f2f2" }}>{r.user_name}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f2f2f2" }}>{r.product_name}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f2f2f2" }}>{r.product_review}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f2f2f2" }}>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

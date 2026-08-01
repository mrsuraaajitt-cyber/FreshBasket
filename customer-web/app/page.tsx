"use client";

import { useState } from "react";

type Product = {
  image: string;
  name: string;
  price: number;
};

const products: Product[] = [
  {
    image: "🥔",
    name: "Fresh Potato",
    price: 40,
  },
  {
    image: "🍅",
    name: "Fresh Tomato",
    price: 50,
  },
  {
    image: "🧅",
    name: "Fresh Onion",
    price: 45,
  },
  {
    image: "🥕",
    name: "Fresh Carrot",
    price: 60,
  },
];

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <main
      style={{
        backgroundColor: "#f7faf7",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          backgroundColor: "white",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          gap: "30px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {/* LOGO */}
        <div style={{ minWidth: "180px" }}>
          <h1
            style={{
              margin: 0,
              color: "#16a34a",
              fontSize: "28px",
              fontWeight: "800",
            }}
          >
            🥬 FreshBasket
          </h1>
        </div>

        {/* LOCATION */}
        <div style={{ minWidth: "180px" }}>
          <div style={{ fontSize: "13px", color: "#777" }}>Deliver to</div>

          <div
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "#222",
            }}
          >
            📍 Your Location ▾
          </div>
        </div>

        {/* SEARCH */}
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="🔍 Search vegetables, fruits and groceries..."
            style={{
              width: "100%",
              padding: "14px 18px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* LOGIN */}
        <button
          style={{
            background: "white",
            border: "1px solid #16a34a",
            color: "#16a34a",
            padding: "11px 18px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        {/* CART */}
        <button
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          🛒 Cart ({cart.length})
        </button>
      </header>

      {/* CATEGORY MENU */}
      <nav
        style={{
          backgroundColor: "white",
          padding: "14px 40px",
          display: "flex",
          gap: "30px",
          borderBottom: "1px solid #e5e7eb",
          overflowX: "auto",
        }}
      >
        <span>🥕 Vegetables</span>
        <span>🍎 Fruits</span>
        <span>🥬 Leafy Greens</span>
        <span>🥔 Potatoes & Onions</span>
        <span>🌶️ Spices</span>
        <span>🔥 Offers</span>
      </nav>

      {/* HERO */}
      <section
        style={{
          padding: "70px 40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            color: "#166534",
            marginBottom: "15px",
          }}
        >
          Fresh Vegetables at Your Doorstep 🥬
        </h2>

        <p
          style={{
            fontSize: "19px",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Fresh • Quality • Affordable • Home Delivery
        </p>

        <button
          style={{
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            padding: "15px 32px",
            borderRadius: "10px",
            fontSize: "17px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Shop Fresh Vegetables →
        </button>
      </section>

      {/* CATEGORIES */}
      <section
        style={{
          padding: "20px 40px 50px",
          backgroundColor: "white",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            color: "#166534",
            marginBottom: "25px",
          }}
        >
          Shop by Category 🥬
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "15px",
          }}
        >
          {[
            ["🥕", "Vegetables"],
            ["🍅", "Tomatoes"],
            ["🥔", "Potatoes"],
            ["🧅", "Onions"],
            ["🥬", "Leafy Greens"],
            ["🌶️", "Spices"],
          ].map(([icon, name]) => (
            <div
              key={name}
              style={{
                backgroundColor: "#f0fdf4",
                padding: "25px 10px",
                borderRadius: "12px",
                textAlign: "center",
                border: "1px solid #dcfce7",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "40px" }}>{icon}</div>

              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "600",
                  color: "#166534",
                }}
              >
                {name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        style={{
          padding: "50px 40px 70px",
          backgroundColor: "#f7faf7",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            color: "#166534",
            marginBottom: "25px",
          }}
        >
          Fresh Vegetables 🥕
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.name}
              style={{
                backgroundColor: "white",
                borderRadius: "14px",
                padding: "20px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  height: "150px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "75px",
                }}
              >
                {product.image}
              </div>

              <h3
                style={{
                  marginTop: "15px",
                  fontSize: "18px",
                  color: "#222",
                }}
              >
                {product.name}
              </h3>

              <p
                style={{
                  color: "#16a34a",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                ₹{product.price} / kg
              </p>

              <button
                onClick={() => addToCart(product)}
                style={{
                  width: "100%",
                  backgroundColor: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                + Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CART SUMMARY */}
      {cart.length > 0 && (
        <section
          style={{
            position: "fixed",
            right: "25px",
            bottom: "25px",
            width: "320px",
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#166534",
            }}
          >
            🛒 Your Cart
          </h2>

          {cart.map((product, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>
                {product.image} {product.name}
              </span>

              <strong>₹{product.price}</strong>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
              fontSize: "20px",
              fontWeight: "800",
            }}
          >
            <span>Total</span>
            <span style={{ color: "#16a34a" }}>₹{total}</span>
          </div>

          <button
            style={{
              width: "100%",
              marginTop: "15px",
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              padding: "13px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Proceed to Checkout →
          </button>
        </section>
      )}
    </main>
  );
}
"use client";

import { useState } from "react";

type Product = {
  image: string;
  name: string;
  price: number;
};

type CartItem = Product & {
  quantity: number;
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
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.name === product.name
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (name: string) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (name: string) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (name: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.name !== name)
    );
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge = cart.length > 0 ? 20 : 0;

  const total = subtotal + deliveryCharge;

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

        <div style={{ minWidth: "180px" }}>
          <div style={{ fontSize: "13px", color: "#777" }}>
            Deliver to
          </div>

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

        <button
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          🛒 Cart ({totalItems})
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
          {products.map((product) => {
            const cartItem = cart.find(
              (item) => item.name === product.name
            );

            return (
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

                {cartItem ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                    }}
                  >
                    <button
                      onClick={() =>
                        decreaseQuantity(product.name)
                      }
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "1px solid #16a34a",
                        backgroundColor: "white",
                        color: "#16a34a",
                        borderRadius: "8px",
                        fontSize: "20px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>

                    <strong style={{ fontSize: "18px" }}>
                      {cartItem.quantity}
                    </strong>

                    <button
                      onClick={() =>
                        increaseQuantity(product.name)
                      }
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "none",
                        backgroundColor: "#16a34a",
                        color: "white",
                        borderRadius: "8px",
                        fontSize: "20px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
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
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CART */}
      {cart.length > 0 && (
        <section
          style={{
            position: "fixed",
            right: "25px",
            bottom: "25px",
            width: "350px",
            maxHeight: "75vh",
            overflowY: "auto",
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "22px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            border: "1px solid #e5e7eb",
            zIndex: 10,
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

          {cart.map((item) => (
            <div
              key={item.name}
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>
                  {item.image} {item.name}
                </strong>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      decreaseQuantity(item.name)
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "1px solid #16a34a",
                      backgroundColor: "white",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.name)
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "none",
                      backgroundColor: "#16a34a",
                      color: "white",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.name)
                  }
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    color: "#dc2626",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}

          {/* PRICE SUMMARY */}
          <div style={{ marginTop: "18px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>Subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>Delivery</span>
              <strong>₹{deliveryCharge}</strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "12px",
                borderTop: "1px solid #ddd",
                fontSize: "20px",
              }}
            >
              <strong>Total</strong>

              <strong style={{ color: "#16a34a" }}>
                ₹{total}
              </strong>
            </div>

            <button
              style={{
                width: "100%",
                marginTop: "18px",
                backgroundColor: "#16a34a",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "9px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
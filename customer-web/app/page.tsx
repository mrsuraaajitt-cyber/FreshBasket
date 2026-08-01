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

type Customer = {
  name: string;
  phone: string;
  address: string;
  area: string;
};

const products: Product[] = [
  { image: "🥔", name: "Fresh Potato", price: 40 },
  { image: "🍅", name: "Fresh Tomato", price: 50 },
  { image: "🧅", name: "Fresh Onion", price: 45 },
  { image: "🥕", name: "Fresh Carrot", price: 60 },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    address: "",
    area: "",
  });

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.name === product.name
      );

      if (existing) {
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

  const handleCustomerChange = (
    field: keyof Customer,
    value: string
  ) => {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const placeOrder = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.area
    ) {
      alert("Please fill all customer details.");
      return;
    }

    if (customer.phone.length !== 10) {
      alert("Please enter a valid 10 digit mobile number.");
      return;
    }

    const newOrderId =
      "FB-" + Math.floor(100000 + Math.random() * 900000);

    setOrderId(newOrderId);
    setOrderPlaced(true);
    setShowCheckout(false);
  };

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

      {/* CATEGORY NAVIGATION */}
      <nav
        style={{
          backgroundColor: "white",
          padding: "14px 40px",
          display: "flex",
          gap: "30px",
          borderBottom: "1px solid #e5e7eb",
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

                <h3>{product.name}</h3>

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
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={() =>
                        decreaseQuantity(product.name)
                      }
                      style={quantityButton}
                    >
                      −
                    </button>

                    <strong>{cartItem.quantity}</strong>

                    <button
                      onClick={() =>
                        increaseQuantity(product.name)
                      }
                      style={quantityButtonGreen}
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
      {cart.length > 0 && !showCheckout && !orderPlaced && (
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
          <h2 style={{ color: "#166534" }}>🛒 Your Cart</h2>

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
                <div>
                  <button
                    onClick={() =>
                      decreaseQuantity(item.name)
                    }
                    style={smallButton}
                  >
                    −
                  </button>

                  <span style={{ margin: "0 10px" }}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.name)
                    }
                    style={smallGreenButton}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.name)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#dc2626",
                    fontWeight: "600",
                  }}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "18px" }}>
            <div style={summaryRow}>
              <span>Subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>

            <div style={summaryRow}>
              <span>Delivery</span>
              <strong>₹{deliveryCharge}</strong>
            </div>

            <div
              style={{
                ...summaryRow,
                borderTop: "1px solid #ddd",
                paddingTop: "12px",
                fontSize: "20px",
              }}
            >
              <strong>Total</strong>
              <strong style={{ color: "#16a34a" }}>
                ₹{total}
              </strong>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
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
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        </section>
      )}

      {/* CHECKOUT */}
      {showCheckout && !orderPlaced && (
        <div style={overlayStyle}>
          <div style={checkoutBoxStyle}>
            <button
              onClick={() => setShowCheckout(false)}
              style={{
                float: "right",
                border: "none",
                background: "transparent",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <h2 style={{ color: "#166534" }}>
              📦 Checkout
            </h2>

            <p style={{ color: "#666" }}>
              Enter your delivery details
            </p>

            <form onSubmit={placeOrder}>
              <label style={labelStyle}>
                Customer Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={customer.name}
                onChange={(e) =>
                  handleCustomerChange("name", e.target.value)
                }
                style={inputStyle}
              />

              <label style={labelStyle}>
                Mobile Number
              </label>

              <input
                type="tel"
                placeholder="10 digit mobile number"
                maxLength={10}
                value={customer.phone}
                onChange={(e) =>
                  handleCustomerChange(
                    "phone",
                    e.target.value.replace(/\D/g, "")
                  )
                }
                style={inputStyle}
              />

              <label style={labelStyle}>
                Full Address
              </label>

              <textarea
                placeholder="House number, village, road..."
                value={customer.address}
                onChange={(e) =>
                  handleCustomerChange(
                    "address",
                    e.target.value
                  )
                }
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />

              <label style={labelStyle}>
                Delivery Area
              </label>

              <input
                type="text"
                placeholder="Village / Town / District"
                value={customer.area}
                onChange={(e) =>
                  handleCustomerChange("area", e.target.value)
                }
                style={inputStyle}
              />

              {/* ORDER SUMMARY */}
              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  padding: "16px",
                  borderRadius: "10px",
                  marginTop: "20px",
                }}
              >
                <h3 style={{ marginTop: 0 }}>
                  🧾 Order Summary
                </h3>

                <div style={summaryRow}>
                  <span>Items</span>
                  <strong>{totalItems}</strong>
                </div>

                <div style={summaryRow}>
                  <span>Subtotal</span>
                  <strong>₹{subtotal}</strong>
                </div>

                <div style={summaryRow}>
                  <span>Delivery</span>
                  <strong>₹{deliveryCharge}</strong>
                </div>

                <div
                  style={{
                    ...summaryRow,
                    borderTop: "1px solid #bbf7d0",
                    paddingTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  <strong>Total</strong>
                  <strong style={{ color: "#16a34a" }}>
                    ₹{total}
                  </strong>
                </div>
              </div>

              {/* PAYMENT */}
              <div
                style={{
                  marginTop: "18px",
                  padding: "15px",
                  border: "2px solid #16a34a",
                  borderRadius: "10px",
                  backgroundColor: "#f0fdf4",
                }}
              >
                <strong>💵 Payment Method</strong>

                <div style={{ marginTop: "8px" }}>
                  🟢 Cash on Delivery
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  backgroundColor: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "15px",
                  borderRadius: "9px",
                  fontSize: "17px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                ✅ Place Order — ₹{total}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ORDER SUCCESS */}
      {orderPlaced && (
        <div style={overlayStyle}>
          <div
            style={{
              ...checkoutBoxStyle,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "65px" }}>🎉</div>

            <h1 style={{ color: "#16a34a" }}>
              Order Confirmed!
            </h1>

            <p style={{ fontSize: "18px" }}>
              Thank you, {customer.name}!
            </p>

            <div
              style={{
                backgroundColor: "#f0fdf4",
                padding: "18px",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              <p>
                <strong>Order ID</strong>
              </p>

              <h2 style={{ color: "#166534" }}>
                {orderId}
              </h2>

              <p>
                💵 Payment: Cash on Delivery
              </p>

              <p>
                💰 Total: <strong>₹{total}</strong>
              </p>

              <p>
                📍 Delivery Area: {customer.area}
              </p>
            </div>

            <p
              style={{
                marginTop: "20px",
                color: "#555",
              }}
            >
              Your vegetables will be delivered to your
              address.
            </p>

            <button
              onClick={() => {
                setOrderPlaced(false);
                setCart([]);
                setCustomer({
                  name: "",
                  phone: "",
                  address: "",
                  area: "",
                });
              }}
              style={{
                marginTop: "15px",
                backgroundColor: "#16a34a",
                color: "white",
                border: "none",
                padding: "13px 25px",
                borderRadius: "8px",
                fontWeight: "700",
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* STYLES */

const quantityButton = {
  width: "40px",
  height: "40px",
  border: "1px solid #16a34a",
  backgroundColor: "white",
  color: "#16a34a",
  borderRadius: "8px",
  fontSize: "20px",
  fontWeight: "700",
  cursor: "pointer",
};

const quantityButtonGreen = {
  width: "40px",
  height: "40px",
  border: "none",
  backgroundColor: "#16a34a",
  color: "white",
  borderRadius: "8px",
  fontSize: "20px",
  fontWeight: "700",
  cursor: "pointer",
};

const smallButton = {
  width: "32px",
  height: "32px",
  border: "1px solid #16a34a",
  backgroundColor: "white",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "18px",
};

const smallGreenButton = {
  width: "32px",
  height: "32px",
  border: "none",
  backgroundColor: "#16a34a",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "18px",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const labelStyle = {
  display: "block",
  marginTop: "15px",
  marginBottom: "6px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box" as const,
};

const overlayStyle = {
  position: "fixed" as const,
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  zIndex: 100,
};

const checkoutBoxStyle = {
  width: "100%",
  maxWidth: "520px",
  maxHeight: "90vh",
  overflowY: "auto" as const,
  backgroundColor: "white",
  borderRadius: "16px",
  padding: "25px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
};
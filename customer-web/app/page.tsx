"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
  category: string;
  unit: string;
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

type Order = {
  id?: number;
  order_id: string;
  customer_name: string;
  phone: string;
  address: string;
  area: string;
  items: CartItem[];
  subtotal: number;
  delivery_charge: number;
  total: number;
  payment_method: string;
  status: string;
  created_at?: string;
};

const products: Product[] = [
  {
    id: 1,
    image: "🥔",
    name: "Fresh Potato",
    price: 40,
    category: "Vegetables",
    unit: "kg",
  },
  {
    id: 2,
    image: "🍅",
    name: "Fresh Tomato",
    price: 50,
    category: "Vegetables",
    unit: "kg",
  },
  {
    id: 3,
    image: "🧅",
    name: "Fresh Onion",
    price: 45,
    category: "Vegetables",
    unit: "kg",
  },
  {
    id: 4,
    image: "🥕",
    name: "Fresh Carrot",
    price: 60,
    category: "Vegetables",
    unit: "kg",
  },
  {
    id: 5,
    image: "🥬",
    name: "Fresh Spinach",
    price: 30,
    category: "Leafy Greens",
    unit: "bunch",
  },
  {
    id: 6,
    image: "🌶️",
    name: "Fresh Green Chilli",
    price: 80,
    category: "Spices",
    unit: "kg",
  },
  {
    id: 7,
    image: "🍎",
    name: "Fresh Apple",
    price: 120,
    category: "Fruits",
    unit: "kg",
  },
  {
    id: 8,
    image: "🍌",
    name: "Fresh Banana",
    price: 50,
    category: "Fruits",
    unit: "dozen",
  },
];

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Leafy Greens",
  "Potatoes & Onions",
  "Spices",
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    address: "",
    area: "",
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  const [loadingOrder, setLoadingOrder] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [message, setMessage] = useState("");

  // Load cart from browser
  useEffect(() => {
    const savedCart = localStorage.getItem("freshbasket-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        localStorage.removeItem("freshbasket-cart");
      }
    }
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem("freshbasket-cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal >= 500 || subtotal === 0 ? 0 : 30;

  const total = subtotal + deliveryCharge;

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setMessage(`${product.name} added to cart`);
    setTimeout(() => setMessage(""), 2000);
  }

  function increaseQuantity(productId: number) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(productId: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId: number) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  function openCheckout() {
    if (cart.length === 0) {
      setMessage("Your cart is empty");
      return;
    }

    setShowCart(false);
    setShowCheckout(true);
  }

  function generateOrderId() {
    const time = Date.now().toString().slice(-8);
    const random = Math.floor(100 + Math.random() * 900);

    return `FB-${time}-${random}`;
  }

  async function placeOrder() {
    if (cart.length === 0) {
      setMessage("Please add products first");
      return;
    }

    if (!customer.name.trim()) {
      setMessage("Please enter your name");
      return;
    }

    if (!customer.phone.trim()) {
      setMessage("Please enter your phone number");
      return;
    }

    if (customer.phone.trim().length < 10) {
      setMessage("Please enter a valid phone number");
      return;
    }

    if (!customer.address.trim()) {
      setMessage("Please enter your delivery address");
      return;
    }

    if (!customer.area.trim()) {
      setMessage("Please enter your area");
      return;
    }

    setLoadingOrder(true);
    setMessage("");

    const newOrderId = generateOrderId();

    const orderData = {
      order_id: newOrderId,
      customer_name: customer.name.trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
      area: customer.area.trim(),
      items: cart,
      subtotal,
      delivery_charge: deliveryCharge,
      total,
      payment_method: "Cash on Delivery",
      status: "Pending",
    };

    const { data, error } = await supabase
      .from("orders")
      .insert(orderData)
      .select()
      .single();

    setLoadingOrder(false);

    if (error) {
      console.error("Supabase order error:", error);

      setMessage(
        `Order save failed: ${error.message}`
      );

      return;
    }

    const savedOrder: Order = {
      ...data,
      items: data.items as CartItem[],
    };

    setOrders((currentOrders) => [
      savedOrder,
      ...currentOrders,
    ]);

    setOrderSuccess(savedOrder);

    setCart([]);
    setShowCheckout(false);

    localStorage.removeItem("freshbasket-cart");
  }

  async function loadOrders(phoneNumber: string) {
    if (!phoneNumber.trim()) {
      setMessage("Enter your phone number first");
      return;
    }

    setLoadingOrders(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("phone", phoneNumber.trim())
      .order("created_at", {
        ascending: false,
      });

    setLoadingOrders(false);

    if (error) {
      console.error("Orders loading error:", error);

      setMessage(
        `Could not load orders: ${error.message}`
      );

      return;
    }

    const formattedOrders: Order[] = (data || []).map(
      (order) => ({
        ...order,
        items: order.items as CartItem[],
      })
    );

    setOrders(formattedOrders);
  }

  function openOrders() {
    setShowCart(false);
    setShowCheckout(false);
    setShowOrders(true);

    if (customer.phone.trim()) {
      loadOrders(customer.phone);
    }
  }

  return (
    <main style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <button
            style={styles.logoButton}
            onClick={() => {
              setShowCart(false);
              setShowCheckout(false);
              setShowOrders(false);
            }}
          >
            🥬 <strong>FreshBasket</strong>
          </button>

          <div style={styles.location}>
            <small>Deliver to</small>
            <strong>📍 Your Location ▾</strong>
          </div>

          <div style={styles.headerActions}>
            <button
              style={styles.loginButton}
              onClick={() =>
                setMessage("Login feature coming soon")
              }
            >
              Login
            </button>

            <button
              style={styles.cartButton}
              onClick={() => {
                setShowCart(true);
                setShowCheckout(false);
                setShowOrders(false);
              }}
            >
              🛒 Cart ({cartCount})
            </button>

            <button
              style={styles.ordersButton}
              onClick={openOrders}
            >
              📦 My Orders ({orders.length})
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div style={styles.searchWrapper}>
          <span>🔍</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vegetables, fruits and groceries..."
            style={styles.searchInput}
          />
        </div>

        {/* NAVIGATION */}
        <nav style={styles.nav}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowCart(false);
                setShowCheckout(false);
                setShowOrders(false);
              }}
              style={{
                ...styles.navButton,
                ...(selectedCategory === category
                  ? styles.activeNavButton
                  : {}),
              }}
            >
              {category === "Vegetables" && "🥕 "}
              {category === "Fruits" && "🍎 "}
              {category === "Leafy Greens" && "🥬 "}
              {category === "Potatoes & Onions" && "🥔 "}
              {category === "Spices" && "🌶️ "}
              {category === "All" ? "🏠 " : ""}
              {category}
            </button>
          ))}

          <button
            style={styles.offerButton}
            onClick={() => setMessage("Offers coming soon")}
          >
            🔥 Offers
          </button>
        </nav>
      </header>

      {/* MESSAGE */}
      {message && (
        <div style={styles.toast}>
          {message}
        </div>
      )}

      {/* SUCCESS */}
      {orderSuccess && (
        <section style={styles.successBox}>
          <div style={styles.successIcon}>✅</div>

          <h2>Order Placed Successfully!</h2>

          <p>
            Thank you, {orderSuccess.customer_name}.
          </p>

          <p>
            Your Order ID:
            <strong> {orderSuccess.order_id}</strong>
          </p>

          <p>
            Total:
            <strong> ₹{orderSuccess.total}</strong>
          </p>

          <p>
            Payment:
            <strong> Cash on Delivery</strong>
          </p>

          <button
            style={styles.primaryButton}
            onClick={() => setOrderSuccess(null)}
          >
            Continue Shopping
          </button>
        </section>
      )}

      {/* HOME */}
      {!showCart &&
        !showCheckout &&
        !showOrders &&
        !orderSuccess && (
          <>
            {/* HERO */}
            <section style={styles.hero}>
              <div>
                <p style={styles.heroSmall}>
                  Fresh • Quality • Affordable
                </p>

                <h1>
                  Fresh Vegetables
                  <br />
                  at Your Doorstep 🥬
                </h1>

                <p style={styles.heroText}>
                  Fresh • Quality • Affordable • Home Delivery
                </p>

                <button
                  style={styles.heroButton}
                  onClick={() => {
                    document
                      .getElementById("products")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  Shop Fresh Vegetables →
                </button>
              </div>

              <div style={styles.heroEmoji}>
                🥬🥕🍅
                <br />
                🧅🥔🌶️
              </div>
            </section>

            {/* CATEGORY */}
            <section style={styles.section}>
              <h2>Shop by Category 🥬</h2>

              <div style={styles.categoryGrid}>
                <button
                  style={styles.categoryCard}
                  onClick={() =>
                    setSelectedCategory("Vegetables")
                  }
                >
                  <span>🥕</span>
                  Vegetables
                </button>

                <button
                  style={styles.categoryCard}
                  onClick={() =>
                    setSelectedCategory("Fruits")
                  }
                >
                  <span>🍅</span>
                  Tomatoes
                </button>

                <button
                  style={styles.categoryCard}
                  onClick={() =>
                    setSelectedCategory("Potatoes & Onions")
                  }
                >
                  <span>🥔</span>
                  Potatoes
                </button>

                <button
                  style={styles.categoryCard}
                  onClick={() =>
                    setSelectedCategory("Potatoes & Onions")
                  }
                >
                  <span>🧅</span>
                  Onions
                </button>

                <button
                  style={styles.categoryCard}
                  onClick={() =>
                    setSelectedCategory("Leafy Greens")
                  }
                >
                  <span>🥬</span>
                  Leafy Greens
                </button>

                <button
                  style={styles.categoryCard}
                  onClick={() =>
                    setSelectedCategory("Spices")
                  }
                >
                  <span>🌶️</span>
                  Spices
                </button>
              </div>
            </section>

            {/* PRODUCTS */}
            <section
              id="products"
              style={styles.section}
            >
              <div style={styles.sectionTitle}>
                <h2>Fresh Vegetables 🥕</h2>

                <span>
                  {filteredProducts.length} products
                </span>
              </div>

              <div style={styles.productGrid}>
                {filteredProducts.map((product) => (
                  <article
                    key={product.id}
                    style={styles.productCard}
                  >
                    <div style={styles.productImage}>
                      {product.image}
                    </div>

                    <h3>{product.name}</h3>

                    <p style={styles.price}>
                      ₹{product.price} / {product.unit}
                    </p>

                    <button
                      style={styles.addButton}
                      onClick={() => addToCart(product)}
                    >
                      + Add to Cart
                    </button>
                  </article>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div style={styles.empty}>
                  😕 No products found.
                </div>
              )}
            </section>
          </>
        )}

      {/* CART */}
      {showCart && (
        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <h2>🛒 Your Cart</h2>

            <button
              style={styles.closeButton}
              onClick={() => setShowCart(false)}
            >
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <div style={{ fontSize: 70 }}>🛒</div>

              <h2>Your cart is empty</h2>

              <button
                style={styles.primaryButton}
                onClick={() => setShowCart(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div style={styles.cartList}>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={styles.cartItem}
                  >
                    <div style={styles.cartEmoji}>
                      {item.image}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3>{item.name}</h3>

                      <p>
                        ₹{item.price} / {item.unit}
                      </p>
                    </div>

                    <div style={styles.quantityBox}>
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        style={styles.quantityButton}
                      >
                        −
                      </button>

                      <strong>{item.quantity}</strong>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>

                    <button
                      style={styles.removeButton}
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              <div style={styles.summary}>
                <h2>Order Summary</h2>

                <div style={styles.summaryRow}>
                  <span>Subtotal</span>
                  <strong>₹{subtotal}</strong>
                </div>

                <div style={styles.summaryRow}>
                  <span>Delivery</span>
                  <strong>
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
                  </strong>
                </div>

                <hr />

                <div style={styles.totalRow}>
                  <span>Total</span>
                  <strong>₹{total}</strong>
                </div>

                <button
                  style={styles.checkoutButton}
                  onClick={openCheckout}
                >
                  Proceed to Checkout →
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* CHECKOUT */}
      {showCheckout && (
        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <h2>🧾 Checkout</h2>

            <button
              style={styles.closeButton}
              onClick={() => setShowCheckout(false)}
            >
              ✕
            </button>
          </div>

          <div style={styles.checkoutGrid}>
            <div>
              <h3>Delivery Information</h3>

              <label style={styles.label}>
                Full Name
              </label>

              <input
                style={styles.input}
                placeholder="Enter your full name"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    name: e.target.value,
                  })
                }
              />

              <label style={styles.label}>
                Phone Number
              </label>

              <input
                style={styles.input}
                placeholder="Enter 10 digit phone number"
                type="tel"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    phone: e.target.value,
                  })
                }
              />

              <label style={styles.label}>
                Address
              </label>

              <textarea
                style={styles.textarea}
                placeholder="House / village / street"
                value={customer.address}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: e.target.value,
                  })
                }
              />

              <label style={styles.label}>
                Area / Locality
              </label>

              <input
                style={styles.input}
                placeholder="Enter your area"
                value={customer.area}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    area: e.target.value,
                  })
                }
              />

              <div style={styles.paymentBox}>
                <strong>💵 Payment Method</strong>

                <p>Cash on Delivery</p>
              </div>

              <button
                style={{
                  ...styles.checkoutButton,
                  opacity: loadingOrder ? 0.6 : 1,
                }}
                onClick={placeOrder}
                disabled={loadingOrder}
              >
                {loadingOrder
                  ? "Placing Order..."
                  : `Place Order • ₹${total}`}
              </button>
            </div>

            <div style={styles.checkoutSummary}>
              <h3>Your Items</h3>

              {cart.map((item) => (
                <div
                  key={item.id}
                  style={styles.checkoutItem}
                >
                  <span>
                    {item.image} {item.name} ×{" "}
                    {item.quantity}
                  </span>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>
                </div>
              ))}

              <hr />

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>

              <div style={styles.summaryRow}>
                <span>Delivery</span>
                <strong>
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge}`}
                </strong>
              </div>

              <div style={styles.totalRow}>
                <span>Total</span>
                <strong>₹{total}</strong>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ORDERS */}
      {showOrders && (
        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <h2>📦 My Orders</h2>

            <button
              style={styles.closeButton}
              onClick={() => setShowOrders(false)}
            >
              ✕
            </button>
          </div>

          <div style={styles.orderSearch}>
            <input
              style={styles.input}
              placeholder="Enter phone number"
              type="tel"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  phone: e.target.value,
                })
              }
            />

            <button
              style={styles.primaryButton}
              onClick={() =>
                loadOrders(customer.phone)
              }
            >
              {loadingOrders
                ? "Loading..."
                : "Find Orders"}
            </button>
          </div>

          {orders.length === 0 ? (
            <div style={styles.empty}>
              📦 No orders found.
            </div>
          ) : (
            <div>
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  style={styles.orderCard}
                >
                  <div style={styles.orderHeader}>
                    <div>
                      <strong>
                        {order.order_id}
                      </strong>

                      <p style={styles.muted}>
                        {order.created_at
                          ? new Date(
                              order.created_at
                            ).toLocaleString()
                          : ""}
                      </p>
                    </div>

                    <span style={styles.status}>
                      {order.status}
                    </span>
                  </div>

                  <div style={styles.orderItems}>
                    {order.items?.map((item) => (
                      <div
                        key={item.id}
                        style={styles.summaryRow}
                      >
                        <span>
                          {item.image} {item.name} ×{" "}
                          {item.quantity}
                        </span>

                        <strong>
                          ₹{item.price * item.quantity}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <hr />

                  <div style={styles.totalRow}>
                    <span>Total</span>
                    <strong>₹{order.total}</strong>
                  </div>

                  <p>
                    📍 {order.address}, {order.area}
                  </p>

                  <p>
                    💵 {order.payment_method}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* FOOTER */}
      <footer style={styles.footer}>
        <h2>🥬 FreshBasket</h2>

        <p>
          Fresh vegetables • Quality products •
          Home delivery
        </p>

        <small>
          © 2026 FreshBasket. All rights reserved.
        </small>
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f7faf7",
    color: "#172017",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },

  header: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 20,
  },

  headerTop: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "15px 20px",
    display: "flex",
    alignItems: "center",
    gap: 25,
    flexWrap: "wrap",
  },

  logoButton: {
    border: "none",
    background: "transparent",
    fontSize: 22,
    cursor: "pointer",
    color: "#198754",
  },

  location: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    flex: 1,
    minWidth: 160,
  },

  headerActions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },

  loginButton: {
    padding: "10px 15px",
    border: "1px solid #198754",
    borderRadius: 8,
    background: "#fff",
    color: "#198754",
    cursor: "pointer",
  },

  cartButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: 8,
    background: "#198754",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
  },

  ordersButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: 8,
    background: "#edf7ef",
    color: "#198754",
    cursor: "pointer",
    fontWeight: 700,
  },

  searchWrapper: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 20px 12px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  searchInput: {
    width: "100%",
    padding: 13,
    border: "1px solid #d1d5db",
    borderRadius: 10,
    outline: "none",
    fontSize: 15,
  },

  nav: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 20px 12px",
    display: "flex",
    gap: 8,
    overflowX: "auto",
  },

  navButton: {
    whiteSpace: "nowrap",
    border: "none",
    background: "#f3f4f6",
    padding: "9px 13px",
    borderRadius: 20,
    cursor: "pointer",
  },

  activeNavButton: {
    background: "#198754",
    color: "#fff",
  },

  offerButton: {
    whiteSpace: "nowrap",
    border: "none",
    background: "#fff0d8",
    color: "#9a5a00",
    padding: "9px 13px",
    borderRadius: 20,
    cursor: "pointer",
  },

  toast: {
    position: "fixed",
    top: 90,
    right: 20,
    zIndex: 100,
    background: "#172017",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,.15)",
  },

  hero: {
    maxWidth: 1200,
    margin: "25px auto",
    padding: "50px 40px",
    borderRadius: 20,
    background:
      "linear-gradient(135deg, #e9f8ed, #f7fff8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
  },

  heroSmall: {
    color: "#198754",
    fontWeight: 700,
  },

  heroText: {
    color: "#596359",
    fontSize: 17,
  },

  heroButton: {
    marginTop: 15,
    padding: "13px 20px",
    background: "#198754",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  },

  heroEmoji: {
    fontSize: 70,
    lineHeight: 1.5,
    textAlign: "center",
  },

  section: {
    maxWidth: 1200,
    margin: "30px auto",
    padding: "0 20px",
  },

  sectionTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },

  categoryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 14,
  },

  categoryCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    cursor: "pointer",
    fontWeight: 700,
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 18,
  },

  productCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 15,
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 4px 15px rgba(0,0,0,.04)",
  },

  productImage: {
    height: 120,
    borderRadius: 12,
    background: "#f4f8f4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 65,
  },

  price: {
    fontWeight: 700,
    color: "#198754",
  },

  addButton: {
    width: "100%",
    padding: 11,
    background: "#198754",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
  },

  panel: {
    maxWidth: 1100,
    margin: "35px auto",
    padding: "25px 20px",
    minHeight: "65vh",
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  closeButton: {
    border: "none",
    background: "#f3f4f6",
    width: 40,
    height: 40,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: 18,
  },

  cartList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  cartItem: {
    background: "#fff",
    padding: 15,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: 15,
  },

  cartEmoji: {
    fontSize: 40,
  },

  quantityBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  quantityButton: {
    width: 32,
    height: 32,
    border: "1px solid #d1d5db",
    background: "#fff",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 18,
  },

  removeButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  summary: {
    maxWidth: 500,
    marginLeft: "auto",
    marginTop: 25,
    background: "#fff",
    padding: 22,
    borderRadius: 15,
    border: "1px solid #e5e7eb",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "12px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 20,
    marginTop: 15,
  },

  checkoutButton: {
    width: "100%",
    marginTop: 20,
    padding: 14,
    background: "#198754",
    color: "#fff",
    border: "none",
    borderRadius: 9,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
  },

  emptyCart: {
    textAlign: "center",
    padding: 70,
    background: "#fff",
    borderRadius: 15,
  },

  checkoutGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1.3fr) minmax(280px, .7fr)",
    gap: 25,
  },

  label: {
    display: "block",
    marginTop: 15,
    marginBottom: 6,
    fontWeight: 700,
  },

  input: {
    width: "100%",
    padding: 13,
    border: "1px solid #d1d5db",
    borderRadius: 8,
    boxSizing: "border-box",
    fontSize: 15,
  },

  textarea: {
    width: "100%",
    minHeight: 100,
    padding: 13,
    border: "1px solid #d1d5db",
    borderRadius: 8,
    boxSizing: "border-box",
    resize: "vertical",
    fontSize: 15,
  },

  paymentBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    background: "#f1f8f3",
    border: "1px solid #cfe8d5",
  },

  checkoutSummary: {
    background: "#fff",
    padding: 20,
    borderRadius: 15,
    border: "1px solid #e5e7eb",
    height: "fit-content",
  },

  checkoutItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 13,
  },

  orderSearch: {
    display: "flex",
    gap: 10,
    maxWidth: 600,
    marginBottom: 25,
  },

  primaryButton: {
    padding: "12px 18px",
    background: "#198754",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
  },

  orderCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },

  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 15,
    alignItems: "center",
  },

  status: {
    background: "#fff4d6",
    color: "#8a5a00",
    padding: "7px 12px",
    borderRadius: 20,
    fontWeight: 700,
  },

  orderItems: {
    marginTop: 15,
  },

  muted: {
    color: "#6b7280",
    fontSize: 13,
  },

  empty: {
    textAlign: "center",
    padding: 50,
    color: "#6b7280",
  },

  successBox: {
    maxWidth: 650,
    margin: "50px auto",
    padding: 35,
    textAlign: "center",
    background: "#fff",
    borderRadius: 20,
    border: "1px solid #d7eadb",
    boxShadow:
      "0 10px 35px rgba(0,0,0,.07)",
  },

  successIcon: {
    fontSize: 70,
  },

  footer: {
    marginTop: 60,
    padding: "40px 20px",
    textAlign: "center",
    background: "#172017",
    color: "#fff",
  },
};
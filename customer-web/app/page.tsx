export default function Home() {
  return (
    <main style={{ backgroundColor: "#f7faf7", minHeight: "100vh" }}>

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
          🛒 Cart
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

    </main>
  );
}
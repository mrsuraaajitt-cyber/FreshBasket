export default function Home() {
  return (
    <main>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#16a34a",
          color: "white",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
          🥬 FreshBasket
        </h1>

        <nav style={{ display: "flex", gap: "25px" }}>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Home
          </a>

          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Categories
          </a>

          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Offers
          </a>

          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}

      <section
        style={{
          textAlign: "center",
          padding: "100px 20px",
          background: "#f0fff4",
        }}
      >
        <h2
          style={{
            fontSize: "52px",
            color: "#166534",
            marginBottom: "20px",
          }}
        >
          Fresh Vegetables Delivered
        </h2>

        <p
          style={{
            fontSize: "22px",
            color: "#555",
          }}
        >
          Farm Fresh Vegetables at your Doorstep
        </p>

        <input
          type="text"
          placeholder="Search vegetables..."
          style={{
            marginTop: "35px",
            width: "400px",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "18px",
          }}
        />

        <br />

        <button
          style={{
            marginTop: "25px",
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "15px 35px",
            fontSize: "18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Shop Now
        </button>
      </section>
    </main>
  );
}
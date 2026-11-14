"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#FAF7F5",
        color: "#550818",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        userSelect: "none",
        overflowX: "hidden",
      }}
    >
      {/* Top Navbar matching snapshot */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2rem 4rem",
          position: "relative",
          zIndex: 60,
        }}
        className="px-6 sm:px-12 md:px-16"
      >
        <Link
          href="/about"
          style={{
            fontSize: "0.93rem",
            fontWeight: 500,
            color: "#550818",
            textDecoration: "none",
            letterSpacing: "0.3px",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Our Story
        </Link>

        {/* Brand Logo MABZUL® */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#550818",
          }}
        >
          <span
            className="font-cormorant"
            style={{
              fontSize: "1.95rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginRight: "-0.22em",
            }}
          >
            MABZUL&reg;
          </span>
        </Link>

        <span
          style={{
            fontSize: "0.93rem",
            fontWeight: 500,
            color: "#550818",
            letterSpacing: "0.3px",
          }}
        >
          Contact
        </span>
      </header>

      {/* Hero Banner Section with "Contact Us" Hero Image */}
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto 2.5rem auto",
          padding: "0 4rem",
          boxSizing: "border-box",
        }}
        className="px-6 sm:px-12 md:px-16"
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 7",
            maxHeight: "520px",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 55px -10px rgba(85, 8, 24, 0.2)",
          }}
        >
          <Image
            src="/contact-hero.jpg"
            alt="Contact Us - Mabzul Fine Gourmet Gifting"
            fill
            sizes="100vw"
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>

      {/* Main Content matching the snapshot layout */}
      <main
        style={{
          width: "100%",
          maxWidth: "1300px",
          margin: "auto auto",
          padding: "3rem 4rem",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: "4rem 6rem",
          alignItems: "center",
        }}
        className="px-6 sm:px-12 md:px-16 grid-cols-1 md:grid-cols-[1fr_1.3fr]"
      >
        {/* Left Column: Heading */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#550818",
              }}
            >
              CONTACT
            </span>
            <span
              style={{
                width: "48px",
                height: "1px",
                backgroundColor: "rgba(85, 8, 24, 0.4)",
                display: "inline-block",
              }}
            />
          </div>

          <h1
            className="font-cormorant"
            style={{
              fontSize: "clamp(3.4rem, 6.5vw, 6.2rem)",
              fontWeight: 500,
              lineHeight: 1.05,
              color: "#550818",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Get in<br />Touch
          </h1>
        </div>

        {/* Right Column: Blurb + Contact List */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "560px" }}>
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
              fontWeight: 500,
              lineHeight: 1.5,
              color: "rgba(85, 8, 24, 0.9)",
              letterSpacing: "-0.01em",
              margin: "0 0 2.5rem 0",
            }}
          >
            We’d love to hear from you. Reach out for orders, gifting requests or any enquiries.
          </p>

          {/* Contact Details List */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Email */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.6rem",
                padding: "1.4rem 0",
                borderBottom: "1px solid rgba(85, 8, 24, 0.15)",
              }}
            >
              {/* Mail Icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#550818"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <a
                href="mailto:hello@mabzul.com"
                style={{
                  fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
                  fontWeight: 600,
                  color: "#550818",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                hello@mabzul.com
              </a>
            </div>

            {/* Phone */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.6rem",
                padding: "1.4rem 0",
                borderBottom: "1px solid rgba(85, 8, 24, 0.15)",
              }}
            >
              {/* Phone Icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#550818"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a
                href="tel:+919876543210"
                style={{
                  fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
                  fontWeight: 600,
                  color: "#550818",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                +91 98765 43210
              </a>
            </div>

            {/* Location */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.6rem",
                padding: "1.4rem 0",
              }}
            >
              {/* Map Pin Icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#550818"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span
                style={{
                  fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
                  fontWeight: 600,
                  color: "#550818",
                  letterSpacing: "-0.01em",
                }}
              >
                Kerala, India
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer matching snapshot */}
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.8rem 4rem",
          position: "relative",
          zIndex: 30,
        }}
        className="px-6 sm:px-12 md:px-16"
      >
        <div
          style={{
            fontSize: "0.88rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#550818",
          }}
        >
          MABZUL&reg; 2026
        </div>
      </footer>

      {/* Slide-out Navigation Drawer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(63, 5, 17, 0.35)",
          backdropFilter: "blur(2px)",
          zIndex: 70,
          transition: "opacity 0.3s ease",
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
        }}
        onClick={() => setDrawerOpen(false)}
      />

      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "380px",
          maxWidth: "85vw",
          backgroundColor: "#FAF7F5",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.12)",
          zIndex: 80,
          padding: "3rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderLeft: "1px solid rgba(85, 8, 24, 0.1)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <button
          onClick={() => setDrawerOpen(false)}
          style={{
            alignSelf: "flex-end",
            background: "transparent",
            border: "none",
            fontSize: "2rem",
            lineHeight: 1,
            color: "#550818",
            cursor: "pointer",
            padding: "0.25rem",
          }}
          aria-label="Close Drawer"
        >
          &times;
        </button>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            margin: "auto 0",
          }}
        >
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              style={{
                fontSize: "1.75rem",
                fontWeight: 400,
                color: "#550818",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                transition: "transform 0.2s ease, opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(6px)";
                e.currentTarget.style.opacity = "0.7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.opacity = "1";
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ fontSize: "0.75rem", color: "rgba(85, 8, 24, 0.7)", lineHeight: 1.5 }}>
          MABZUL&reg; &mdash; Only What’s Worth Sharing.<br />
          &copy; 2026 Mabzul Confectionery &amp; Gourmet Gifting.
        </div>
      </aside>
    </div>
  );
}


"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const initialFooterRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const scrollDownPromptRef = useRef<HTMLDivElement>(null);
  const brandWatermarkRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 2. Setup GSAP ScrollTrigger timeline
    const ctx = gsap.context(() => {
      if (!heroImageRef.current || !containerRef.current) return;

      gsap.set(scrollDownPromptRef.current, { opacity: 0 });
      gsap.set(brandWatermarkRef.current, { opacity: 0, y: -10 });

      // Create scroll-driven pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Expand image from centered square to full bleed hero (104vw x 104vh)
      tl.to(
        heroImageRef.current,
        {
          width: "104vw",
          height: "104vh",
          borderRadius: "0px",
          boxShadow: "none",
          ease: "power2.inOut",
        },
        0
      )
        .to(
          headlineRef.current,
          {
            opacity: 0,
            scale: 0.94,
            ease: "power1.out",
          },
          0
        )
        .to(
          initialFooterRef.current,
          {
            opacity: 0,
            ease: "power1.out",
          },
          0
        )
        // Fade out top navbar as the image expands so the full bleed hero is clean
        .to(
          navRef.current,
          {
            opacity: 0,
            y: -15,
            ease: "power1.out",
          },
          0.15
        )
        // Fade in brand label on top-left of hero as expansion completes
        .to(
          brandWatermarkRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.6
        )
        // Reveal bottom explore invitation once expanded
        .to(
          scrollDownPromptRef.current,
          {
            opacity: 1,
            ease: "power1.in",
          },
          0.65
        )
        // Hero rests at full screen
        .to({}, { duration: 0.45 });

      // When the user scrolls past the pinned hero stage into the content section,
      // bring back the navbar seamlessly
      if (contentSectionRef.current) {
        ScrollTrigger.create({
          trigger: contentSectionRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(navRef.current, {
              opacity: 1,
              y: 0,
              color: "#550818",
              duration: 0.4,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(navRef.current, {
              opacity: 0,
              y: -15,
              duration: 0.3,
              ease: "power2.in",
            });
          },
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#FAF7F5",
        color: "#550818",
        minHeight: "100vh",
        position: "relative",
        userSelect: "none",
        overflowX: "hidden",
      }}
    >
      {/* Transparent Fixed Navbar */}
      <header
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2rem 4rem",
          zIndex: 60,
          backgroundColor: "transparent",
          backdropFilter: "none",
        }}
        className="px-6 sm:px-12 md:px-16"
      >
        <Link
          href="#story"
          onClick={(e) => {
            e.preventDefault();
            setDrawerOpen(true);
          }}
          style={{
            fontSize: "0.93rem",
            fontWeight: 500,
            color: "inherit",
            textDecoration: "none",
            letterSpacing: "0.3px",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Our Story
        </Link>

        {/* Center Brand Logo MABZUL® */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "inherit",
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
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            &middot;MABZUL&reg;
          </span>
        </Link>

        <Link
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            setDrawerOpen(true);
          }}
          style={{
            fontSize: "0.93rem",
            fontWeight: 500,
            color: "inherit",
            textDecoration: "none",
            letterSpacing: "0.3px",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Contact
        </Link>
      </header>

      {/* Pinned Hero Stage */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ height: "90px" }} />

          {/* Hero Main Content */}
          <main
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "100vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 2rem",
              boxSizing: "border-box",
              flex: 1,
            }}
          >
            {/* 
              Headline Grid Architecture:
              3-column layout ensures:
              1) "Only What's" right-aligned to center
              2) The center column holds the exact square width with balanced spacing
              3) "Worth Sharing" left-aligned to center
              --> Zero overlapping at any screen size!
            */}
            <h1
              ref={headlineRef}
              style={{
                fontSize: "clamp(2rem, 5.2vw, 5.2rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#550818",
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                width: "100%",
                maxWidth: "96vw",
                margin: 0,
                whiteSpace: "nowrap",
                position: "relative",
              }}
            >
              {/* Left Column: Only What's */}
              <span style={{ textAlign: "right", whiteSpace: "nowrap", paddingRight: "clamp(0.6rem, 1.2vw, 1.5rem)" }}>
                Only What’s
              </span>

              {/* Center Column: Spacer matching the square image */}
              <span
                style={{
                  display: "inline-block",
                  width: "clamp(85px, 9.5vw, 125px)",
                  height: "clamp(85px, 9.5vw, 125px)",
                  flexShrink: 0,
                  visibility: "hidden",
                }}
              />

              {/* Right Column: Worth Sharing */}
              <span style={{ textAlign: "left", whiteSpace: "nowrap", paddingLeft: "clamp(0.6rem, 1.2vw, 1.5rem)" }}>
                Worth Sharing
              </span>
            </h1>

            {/* 
              THE SQUARE IMAGE CONTAINER:
              Positioned at exact center: top: 50%, left: 50%, transform: translate(-50%, -50%).
            */}
            <div
              ref={heroImageRef}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "clamp(85px, 9.5vw, 125px)",
                height: "clamp(85px, 9.5vw, 125px)",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 14px 34px -6px rgba(85, 8, 24, 0.38), 0 0 0 1px rgba(85, 8, 24, 0.08)",
                zIndex: 25,
                willChange: "width, height, border-radius",
              }}
            >
              <Image
                src="/dates-chocolate.jpg"
                alt="Gourmet Pistachio Stuffed Dates Drizzled with Fine Dark Chocolate"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
                priority
              />

              {/* Brand Label on top-left of expanded hero (matches user snapshot) */}
              <div
                ref={brandWatermarkRef}
                style={{
                  position: "absolute",
                  top: "2.5rem",
                  left: "3rem",
                  zIndex: 35,
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "flex-start",
                }}
                className="top-6 left-6 sm:top-10 sm:left-12 md:top-12 md:left-14"
              >
                <span
                  className="font-cormorant"
                  style={{
                    fontSize: "clamp(2.8rem, 5.8vw, 5.4rem)",
                    fontWeight: 600,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#FAF7F5",
                    textShadow: "0 4px 20px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.3)",
                    lineHeight: 1,
                  }}
                >
                  MABZUL
                  <span
                    style={{
                      fontSize: "0.42em",
                      verticalAlign: "super",
                      marginLeft: "0.22em",
                      fontWeight: 400,
                    }}
                  >
                    &reg;
                  </span>
                </span>
              </div>

              {/* Bottom scroll down invitation on the expanded hero */}
              <div
                ref={scrollDownPromptRef}
                style={{
                  position: "absolute",
                  bottom: "3rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.78rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#FAF7F5",
                  textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                  pointerEvents: "none",
                  zIndex: 30,
                }}
              >
                <span>Scroll down to explore</span>
                <span style={{ fontSize: "1.1rem" }}>&darr;</span>
              </div>
            </div>
          </main>

          {/* Initial Hero Footer */}
          <footer
            ref={initialFooterRef}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.2rem 4rem",
              position: "relative",
              zIndex: 30,
            }}
            className="px-6 sm:px-12 md:px-16"
          >
            <div
              style={{
                fontSize: "0.88rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#550818",
              }}
            >
              MABZUL&reg; 2026
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <button
                onClick={() => setDrawerOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  padding: "0.65rem 1.4rem",
                  border: "1px solid rgba(85, 8, 24, 0.45)",
                  backgroundColor: "transparent",
                  color: "#550818",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  cursor: "pointer",
                }}
              >
                <span>SHOP NOW</span>
                <span style={{ fontFamily: "serif", fontSize: "0.95rem", letterSpacing: "2px" }}>
                  ::
                </span>
              </button>

              <button
                onClick={() => setDrawerOpen(true)}
                style={{
                  width: "42px",
                  height: "42px",
                  backgroundColor: "#550818",
                  border: "none",
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  cursor: "pointer",
                }}
                aria-label="Toggle navigation menu"
              >
                <span style={{ display: "block", width: "15px", height: "2px", backgroundColor: "#FAF7F5", borderRadius: "1px" }} />
                <span style={{ display: "block", width: "9px", height: "2px", backgroundColor: "#FAF7F5", borderRadius: "1px", alignSelf: "flex-start", marginLeft: "13.5px" }} />
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* Purpose / About Section (Directly after Hero) */}
      <section
        ref={contentSectionRef}
        style={{
          position: "relative",
          zIndex: 35,
          minHeight: "75vh",
          padding: "7rem 4rem 5rem 4rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          backgroundColor: "#FAF7F5",
        }}
        className="px-6 sm:px-12 md:px-16"
      >
        <div
          style={{
            width: "100%",
            padding: "2rem 0 4rem 0",
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: "2rem 4rem",
            alignItems: "start",
          }}
          className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[200px_1fr]"
        >
          {/* Left Column: Label like (About Us) in Snapshot 1 */}
          <div style={{ paddingTop: "0.6rem" }}>
            <span
              style={{
                fontSize: "0.92rem",
                fontWeight: 500,
                color: "#550818",
                opacity: 0.85,
                letterSpacing: "0.01em",
              }}
            >
              (Our Purpose)
            </span>
          </div>

          {/* Right Column: Statement in Snapshot 1's Font Style, Weight & Size */}
          <div style={{ maxWidth: "1050px" }}>
            <h2
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(2rem, 3.8vw, 3.75rem)",
                fontWeight: 600,
                lineHeight: 1.22,
                letterSpacing: "-0.03em",
                color: "#550818",
                margin: 0,
                textAlign: "left",
              }}
            >
              To make everyday indulgence and gifting more meaningful.
            </h2>
          </div>
        </div>

        {/* Vision and Mission: Vision full left-aligned, Mission right side */}
        <div
          style={{
            width: "100%",
            marginTop: "3.5rem",
            marginBottom: "3rem",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3.5rem 4rem",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Vision Block (Pulled all the way left) */}
          <div style={{ display: "flex", flexDirection: "column", textAlign: "left", maxWidth: "620px" }}>
            <h3
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(2rem, 3.8vw, 3.75rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "#550818",
                margin: "0 0 1.2rem 0",
                letterSpacing: "-0.03em",
              }}
            >
              Vision
            </h3>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(1.2rem, 1.9vw, 1.75rem)",
                fontWeight: 500,
                lineHeight: 1.38,
                color: "rgba(85, 8, 24, 0.88)",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              To become the destination people think of first for dates, nuts and chocolates that are as good to give as they are to enjoy.
            </p>
          </div>

          {/* Mission Block (Right side, staggered lower matching arrow direction) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              maxWidth: "620px",
              marginLeft: "auto",
              marginTop: "clamp(1.5rem, 4vw, 4rem)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(2rem, 3.8vw, 3.75rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "#550818",
                margin: "0 0 1.2rem 0",
                letterSpacing: "-0.03em",
              }}
            >
              Mission
            </h3>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(1.2rem, 1.9vw, 1.75rem)",
                fontWeight: 500,
                lineHeight: 1.38,
                color: "rgba(85, 8, 24, 0.88)",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              To select quality products, present them with care, and make gifting simple for every occasion, from a family visit to a client thank-you.
            </p>
          </div>
        </div>

        {/* Bottom footer bar */}
        <div
          style={{
            width: "100%",
            marginTop: "6rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(85, 8, 24, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#550818" }}>
            MABZUL&reg; 2026
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <button
              onClick={() => setDrawerOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.85rem",
                padding: "0.65rem 1.4rem",
                border: "1px solid rgba(85, 8, 24, 0.45)",
                backgroundColor: "transparent",
                color: "#550818",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                cursor: "pointer",
              }}
            >
              <span>SHOP NOW</span>
              <span style={{ fontFamily: "serif", fontSize: "0.95rem", letterSpacing: "2px" }}>::</span>
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              style={{
                width: "42px",
                height: "42px",
                backgroundColor: "#550818",
                border: "none",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                cursor: "pointer",
              }}
              aria-label="Toggle navigation menu"
            >
              <span style={{ display: "block", width: "15px", height: "2px", backgroundColor: "#FAF7F5", borderRadius: "1px" }} />
              <span style={{ display: "block", width: "9px", height: "2px", backgroundColor: "#FAF7F5", borderRadius: "1px", alignSelf: "flex-start", marginLeft: "13.5px" }} />
            </button>
          </div>
        </div>
      </section>

      {/* Backdrop overlay */}
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
        onClick={() => {
          setDrawerOpen(false);
        }}
      />

      {/* Slide-out Navigation Drawer */}
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
            { label: "Our Story", href: "#story" },
            { label: "Curated Medjool Dates", href: "#dates" },
            { label: "Artisanal Chocolates", href: "#chocolates" },
            { label: "Roasted & Raw Nuts", href: "#nuts" },
            { label: "Meaningful Gifting Boxes", href: "#gifting" },
            { label: "Corporate Orders", href: "#corporate" },
            { label: "Contact Us", href: "#contact" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setDrawerOpen(false);
              }}
              style={{
                fontSize: "1.45rem",
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
            </a>
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

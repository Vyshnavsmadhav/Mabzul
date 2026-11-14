"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function AboutPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const contactTransitionTrackRef = useRef<HTMLDivElement>(null);
  const contactCurtainRef = useRef<HTMLDivElement>(null);
  const contactHeroWrapperRef = useRef<HTMLDivElement>(null);
  const contactHeroImageRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const contactContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Lenis Smooth Scroll Engine
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

    const ctx = gsap.context(() => {
      // EXACT Scroll-Driven Transition matching the Home -> About reference recording:
      // Pinned theatrical transition: The incoming Contact Hero starts centered / compact,
      // rises up over the content, smoothly expands and fills the screen, reveals the
      // title/tagline overlay, then seamlessly leads into the full Contact page story & details.
      if (
        contactTransitionTrackRef.current &&
        contactCurtainRef.current &&
        contactHeroWrapperRef.current &&
        contactHeroImageRef.current
      ) {
        gsap.set(contactCurtainRef.current, {
          y: "30%",
        });
        gsap.set(contactHeroWrapperRef.current, {
          width: "56vw",
          height: "44vh",
          borderRadius: "24px",
          boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
        });
        gsap.set(contactHeroImageRef.current, {
          scale: 1.15,
        });
        if (contactContentRef.current) {
          gsap.set(contactContentRef.current, {
            opacity: 0,
            y: 30,
          });
        }

        const transitionTl = gsap.timeline({
          scrollTrigger: {
            trigger: contactTransitionTrackRef.current,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Stage 1: The curtain sweeps up immediately into view
        transitionTl
          .to(
            contactCurtainRef.current,
            {
              y: "0%",
              ease: "power2.out",
            },
            0
          )
          // Stage 2: Hero expands from compact preview to full bleed screen smoothly
          .to(
            contactHeroWrapperRef.current,
            {
              width: "100vw",
              height: "100vh",
              borderRadius: "0px",
              boxShadow: "none",
              ease: "power2.inOut",
            },
            0.15
          )
          // Image counter-scale for parallax depth
          .to(
            contactHeroImageRef.current,
            {
              scale: 1,
              ease: "power2.inOut",
            },
            0.15
          )
          // Snappy transition into content
          .to({}, { duration: 0.2 });

        // Once the user scrolls past the pinned transition into the Contact section,
        // fade in the editorial contact content
        if (contactSectionRef.current && contactContentRef.current) {
          ScrollTrigger.create({
            trigger: contactSectionRef.current,
            start: "top 75%",
            onEnter: () => {
              gsap.to(contactContentRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(contactContentRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.4,
                ease: "power2.in",
              });
            },
          });
        }
      }
    }, mainWrapperRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <div
      ref={mainWrapperRef}
      style={{
        backgroundColor: "#FAF7F5",
        color: "#550818",
        minHeight: "100vh",
        position: "relative",
        userSelect: "none",
        overflowX: "hidden",
      }}
    >
      {/* Header / Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.8rem 4rem",
          zIndex: 60,
          backgroundColor: "rgba(250, 247, 245, 0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(85, 8, 24, 0.08)",
        }}
        className="px-6 sm:px-12 md:px-16"
      >
        <Link
          href="/"
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
          Home
        </Link>

        {/* Center Brand Logo */}
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
            &middot;MABZUL&reg;
          </span>
        </Link>

        <button
          onClick={() => setDrawerOpen(true)}
          style={{
            background: "none",
            border: "none",
            fontSize: "0.93rem",
            fontWeight: 500,
            color: "#550818",
            cursor: "pointer",
            letterSpacing: "0.3px",
            padding: 0,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Menu
        </button>
      </header>

      {/* Main About Editorial Content */}
      <main
        style={{
          width: "100%",
          padding: "1.5rem 4rem 4rem 4rem",
          maxWidth: "1400px",
          margin: "0 auto",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 30,
        }}
        className="px-6 sm:px-12 md:px-16"
      >
        {/* Title Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "#550818",
              opacity: 0.85,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            (Our Heritage &amp; Craft)
          </span>
          <h1
            style={{
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.8rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#550818",
              marginTop: "0.4rem",
              marginBottom: 0,
            }}
          >
            About Mabzul
          </h1>
        </div>

        {/* Hero Image Section */}
        <div
          style={{
            width: "100%",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 24px 60px -12px rgba(85, 8, 24, 0.18)",
            position: "relative",
            aspectRatio: "1024 / 509",
            marginBottom: "4.5rem",
          }}
        >
          <Image
            src="/about-hero.jpg"
            alt="Mabzul Fine Artisanal Chocolate, Almonds, Pistachios, and Cashews"
            fill
            sizes="100vw"
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        {/* Story Section in Editorial Headline Font & Style */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          {/* Paragraph 1: Left aligned */}
          <div style={{ maxWidth: "780px", width: "100%" }}>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(1.35rem, 2.2vw, 2.05rem)",
                fontWeight: 600,
                lineHeight: 1.38,
                letterSpacing: "-0.025em",
                color: "#550818",
                margin: 0,
                textAlign: "left",
              }}
            >
              MABZUL is built around the culture of goodness and sharing. Its identity takes inspiration from the date palm, connecting the brand to the heritage of dates and dry fruits, while its balanced visual form reflects curated gifts and hampers.
            </p>
          </div>

          {/* Paragraph 2: Positioned to the Right Half side of container */}
          <div
            style={{
              maxWidth: "780px",
              width: "100%",
              marginLeft: "auto",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(1.35rem, 2.2vw, 2.05rem)",
                fontWeight: 600,
                lineHeight: 1.38,
                letterSpacing: "-0.025em",
                color: "#550818",
                margin: 0,
              }}
            >
              Our generosity gives sharing its purpose. Our quality earns trust. Our attention to detail makes every gesture special. Our heritage gives every experience a deeper meaning.
            </p>
          </div>
        </div>

        {/* Three Everyday Buyers Section */}
        <div
          style={{
            width: "100%",
            marginTop: "6rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              fontSize: "clamp(1.05rem, 1.5vw, 1.45rem)",
              fontWeight: 500,
              color: "rgba(85, 8, 24, 0.88)",
              letterSpacing: "-0.015em",
              marginBottom: "3rem",
              textAlign: "left",
            }}
          >
            Three everyday buyers who shape how MABZUL looks, sounds and serves.
          </p>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "3rem",
            }}
          >
            {[
              {
                title: "THE\nTHOUGHTFUL\nHOST",
                desc: "Welcomes family and guests often and wants something generous to put on the table.",
                wants: "Quality they are proud to serve, presented with care.",
                worries: "Gifts and treats that feel generic.",
                alignment: "flex-start",
              },
              {
                title: "THE\nCORPORATE\nGIFTER",
                desc: "Buys for clients, teams and events, and needs gifts that look professional.",
                wants: "Presentable, easy to order, consistent every time.",
                worries: "Options that feel too formal, or service that lets them down.",
                alignment: "center",
              },
              {
                title: "THE\nEVERYDAY\nTREATER",
                desc: "Enjoys good dates, nuts and chocolates for themselves.",
                wants: "A small, well-chosen treat that feels like a moment.",
                worries: "Everyday shops with little care in presentation.",
                alignment: "flex-end",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: card.alignment,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    maxWidth: "380px",
                    backgroundColor: "rgba(85, 8, 24, 0.03)",
                    border: "1px solid rgba(85, 8, 24, 0.18)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 14px 34px -8px rgba(85, 8, 24, 0.08)",
                  }}
                >
                  <div
                    style={{
                      height: "14px",
                      backgroundColor: "#550818",
                      width: "100%",
                    }}
                  />

                  <div
                    style={{
                      padding: "2.4rem 2rem 2.8rem 2rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2.2rem",
                      flex: 1,
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-plus-jakarta), sans-serif",
                          fontSize: "clamp(1.4rem, 1.8vw, 1.65rem)",
                          fontWeight: 800,
                          lineHeight: 1.22,
                          letterSpacing: "0.02em",
                          color: "#550818",
                          margin: "0 0 1rem 0",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {card.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-plus-jakarta), sans-serif",
                          fontSize: "1.05rem",
                          lineHeight: 1.55,
                          color: "rgba(85, 8, 24, 0.85)",
                          margin: 0,
                        }}
                      >
                        {card.desc}
                      </p>
                    </div>

                    <div>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 800,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#550818",
                          display: "block",
                          marginBottom: "0.45rem",
                        }}
                      >
                        WANTS
                      </span>
                      <p
                        style={{
                          fontFamily: "var(--font-plus-jakarta), sans-serif",
                          fontSize: "1.02rem",
                          lineHeight: 1.55,
                          color: "rgba(85, 8, 24, 0.85)",
                          margin: 0,
                        }}
                      >
                        {card.wants}
                      </p>
                    </div>

                    <div>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 800,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#550818",
                          display: "block",
                          marginBottom: "0.45rem",
                        }}
                      >
                        WORRIES ABOUT
                      </span>
                      <p
                        style={{
                          fontFamily: "var(--font-plus-jakarta), sans-serif",
                          fontSize: "1.02rem",
                          lineHeight: 1.55,
                          color: "rgba(85, 8, 24, 0.85)",
                          margin: 0,
                        }}
                      >
                        {card.worries}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 
        PINNED SCROLL-DRIVEN TRANSITION STAGE (Exact replica of Home -> About video animation)
        - Pinned hero starts compact & centered
        - Curtain sweeps up and hero expands into full bleed viewport
      */}
      <section
        ref={contactTransitionTrackRef}
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#FAF7F5",
          zIndex: 42,
        }}
      >
        <div
          ref={contactCurtainRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "transform",
          }}
        >
          {/* Centered expanding hero frame */}
          <div
            ref={contactHeroWrapperRef}
            style={{
              position: "relative",
              overflow: "hidden",
              willChange: "width, height, border-radius",
            }}
          >
            {/* Hero Image */}
            <div
              ref={contactHeroImageRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                willChange: "transform",
              }}
            >
              <Image
                src="/contact-hero.jpg"
                alt="Contact Us - Mabzul Confectionery & Gourmet Gifting"
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
        </div>
      </section>

      {/* Full Editorial Contact Section (Leading directly after pinned transition) */}
      <section
        id="contact"
        ref={contactSectionRef}
        style={{
          position: "relative",
          zIndex: 45,
          backgroundColor: "#FAF7F5",
          color: "#550818",
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "5rem 4rem 3rem 4rem",
          boxSizing: "border-box",
        }}
        className="px-6 sm:px-12 md:px-16"
      >
        <div
          ref={contactContentRef}
          style={{
            width: "100%",
            maxWidth: "1300px",
            margin: "auto auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "4rem 6rem",
            alignItems: "center",
            willChange: "opacity, transform",
          }}
          className="grid-cols-1 md:grid-cols-[1fr_1.3fr]"
        >
          {/* Left Column: Heading "Let's Connect." */}
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

            <h2
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
              Let’s<br />Connect.
            </h2>
          </div>

          {/* Right Column: Blurb + Verified Contact List */}
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
        </div>

        {/* Footer */}
        <footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2.5rem 0 0.5rem 0",
            borderTop: "1px solid rgba(85, 8, 24, 0.12)",
            marginTop: "4rem",
            width: "100%",
          }}
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
              <span
                style={{
                  display: "block",
                  width: "15px",
                  height: "2px",
                  backgroundColor: "#FAF7F5",
                  borderRadius: "1px",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "9px",
                  height: "2px",
                  backgroundColor: "#FAF7F5",
                  borderRadius: "1px",
                  alignSelf: "flex-start",
                  marginLeft: "13.5px",
                }}
              />
            </button>
          </div>
        </footer>
      </section>

      {/* Drawer Overlay */}
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

      {/* Slide-out Drawer */}
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


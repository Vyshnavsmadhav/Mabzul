"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const initialFooterRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const scrollDownPromptRef = useRef<HTMLDivElement>(null);
  const brandWatermarkRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLElement>(null);

  // About Section References for Scroll-Driven Transition
  const aboutTransitionTrackRef = useRef<HTMLDivElement>(null);
  const aboutCurtainRef = useRef<HTMLDivElement>(null);
  const aboutHeroWrapperRef = useRef<HTMLDivElement>(null);
  const aboutHeroImageRef = useRef<HTMLDivElement>(null);
  const aboutHeroOverlayTextRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutHeaderRef = useRef<HTMLDivElement>(null);
  const aboutStoryRef = useRef<HTMLDivElement>(null);
  const buyersSectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Contact Section References for Scroll-Driven Transition from About
  const contactTransitionTrackRef = useRef<HTMLDivElement>(null);
  const contactCurtainRef = useRef<HTMLDivElement>(null);
  const contactHeroWrapperRef = useRef<HTMLDivElement>(null);
  const contactHeroImageRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const contactContentRef = useRef<HTMLDivElement>(null);

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

    // 2. Setup GSAP ScrollTrigger timeline across the entire page
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

      // 3. Exact Scroll-Driven Transition matching Reference Video:
      // Pinned theatrical transition: The incoming About Hero starts centered / compact,
      // rises up over the content, smoothly expands and fills the screen, reveals the
      // title/tagline overlay, then seamlessly leads into the full About page story content.
      if (
        aboutTransitionTrackRef.current &&
        aboutCurtainRef.current &&
        aboutHeroWrapperRef.current &&
        aboutHeroImageRef.current
      ) {
        gsap.set(aboutCurtainRef.current, {
          y: "30%",
        });
        gsap.set(aboutHeroWrapperRef.current, {
          width: "56vw",
          height: "44vh",
          borderRadius: "24px",
          boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
        });
        gsap.set(aboutHeroImageRef.current, {
          scale: 1.15,
        });
        if (aboutHeroOverlayTextRef.current) {
          gsap.set(aboutHeroOverlayTextRef.current, {
            opacity: 0,
            y: 20,
          });
        }
        if (aboutStoryRef.current) {
          gsap.set(aboutStoryRef.current, {
            opacity: 0,
            y: 30,
          });
        }

        const transitionTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutTransitionTrackRef.current,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Stage 1: The curtain sweeps up immediately into view
        transitionTl.to(
          aboutCurtainRef.current,
          {
            y: "0%",
            ease: "power2.out",
          },
          0
        )
        // Stage 2: Hero expands from compact preview to full bleed screen smoothly
        .to(
          aboutHeroWrapperRef.current,
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
          aboutHeroImageRef.current,
          {
            scale: 1,
            ease: "power2.inOut",
          },
          0.15
        )
        // Snappy transition into content
        .to({}, { duration: 0.2 });

        // Once the user scrolls past the pinned transition into the About story section,
        // fade in the editorial content
        if (aboutSectionRef.current && aboutStoryRef.current) {
          ScrollTrigger.create({
            trigger: aboutSectionRef.current,
            start: "top 75%",
            onEnter: () => {
              gsap.to(aboutStoryRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(aboutStoryRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.4,
                ease: "power2.in",
              });
            },
          });
        }
      }

      // 4. Dedicated Full Pinned Scroll Stage for the 3 Stepped Buyer Cards
      // The viewport pins cleanly, showing Card 1 first. Then Card 2 is pulled up,
      // followed by Card 3. All 3 cards rest completely visible in viewport before the page releases down.
      if (
        buyersSectionRef.current &&
        card1Ref.current &&
        card2Ref.current &&
        card3Ref.current
      ) {
        gsap.set(card2Ref.current, { y: "100vh", opacity: 0 });
        gsap.set(card3Ref.current, { y: "100vh", opacity: 0 });

        const buyersTl = gsap.timeline({
          scrollTrigger: {
            trigger: buyersSectionRef.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Step 1: Hold Card 1 briefly as pinned section begins
        buyersTl.to({}, { duration: 0.2 });

        // Step 2: Card 2 pulls up smoothly into center
        buyersTl.to(card2Ref.current, {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1.2,
        });

        // Step 3: Card 3 pulls up smoothly into right
        buyersTl.to(
          card3Ref.current,
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1.2,
          },
          "+=0.2"
        );

        // Step 4: Crucial hold: all three cards stay fully up and visible together before releasing the page downwards
        buyersTl.to({}, { duration: 1.2 });
      }

      // 5. Scroll-Driven Transition from About to Contact
      // Exactly identical pinned theatrical transition as Hero -> About:
      // The incoming Contact Hero starts centered / compact, rises up over the content,
      // smoothly expands and fills the screen, then seamlessly leads into the full Contact section.
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

        const contactTl = gsap.timeline({
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
        contactTl
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
          // Parallax counter-scale
          .to(
            contactHeroImageRef.current,
            {
              scale: 1,
              ease: "power2.inOut",
            },
            0.15
          )
          .to({}, { duration: 0.2 });

        // Once scrolled past the pinned transition, reveal the Contact section content
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
          href="/about"
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
          href="/contact"
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

        {/* Featured Showcase: Gift Box & Brand Story Side-by-Side */}
        <div
          style={{
            width: "100%",
            marginTop: "3.5rem",
            marginBottom: "3.5rem",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "3rem 4.5rem",
            alignItems: "center",
          }}
        >
          {/* Left: Image (Parallel) */}
          <div
            style={{
              flex: "0 0 auto",
              width: "100%",
              maxWidth: "520px",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 22px 55px -10px rgba(85, 8, 24, 0.16)",
              position: "relative",
              aspectRatio: "490 / 648",
            }}
          >
            <Image
              src="/mabzul-gift-box.jpg"
              alt="Mabzul Luxury Gift Box - Dates, Nuts, Chocolates"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>

          {/* Right: Brand Detail Text (Beside / Parallel to the Image) */}
          <div
            style={{
              flex: "1 1 340px",
              display: "flex",
              flexDirection: "column",
              gap: "2.2rem",
              maxWidth: "680px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
                fontWeight: 500,
                lineHeight: 1.6,
                color: "rgba(85, 8, 24, 0.88)",
                margin: 0,
                letterSpacing: "-0.015em",
              }}
            >
              MABZUL is built around the culture of goodness and sharing. Its identity takes inspiration from the date palm, connecting the brand to the heritage of dates and dry fruits, while its balanced visual form reflects curated gifts and hampers.
            </p>

            <p
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
                fontWeight: 500,
                lineHeight: 1.6,
                color: "rgba(85, 8, 24, 0.88)",
                margin: 0,
                letterSpacing: "-0.015em",
              }}
            >
              Bringing together dates, nuts and chocolates, MABZUL turns familiar favourites into a refined experience for everyday enjoyment, hosting and meaningful gifting. The brand feels contemporary and welcoming, with a clear connection to regional food culture.
            </p>

            <p
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
                fontWeight: 500,
                lineHeight: 1.6,
                color: "rgba(85, 8, 24, 0.88)",
                margin: 0,
                letterSpacing: "-0.015em",
              }}
            >
              MABZUL aims to be the brand people think of when they want quality treats, or a gift that feels generous and considered.
            </p>
          </div>
        </div>
      </section>

      {/* Pinned Scroll Transition Stage (Reference Video Style: Pinned Hero Expansion from Center into Full Bleed) */}
      <section
        ref={aboutTransitionTrackRef}
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
          ref={aboutCurtainRef}
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
            ref={aboutHeroWrapperRef}
            style={{
              position: "relative",
              overflow: "hidden",
              willChange: "width, height, border-radius",
            }}
          >
            {/* Hero Image */}
            <div
              ref={aboutHeroImageRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                willChange: "transform",
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
          </div>
        </div>
      </section>

      {/* Full Editorial About Story Section */}
      <section
        id="about"
        ref={aboutSectionRef}
        style={{
          position: "relative",
          zIndex: 45,
          backgroundColor: "#FAF7F5",
          padding: "5rem 4rem 5rem 4rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          minHeight: "70vh",
        }}
        className="px-6 sm:px-12 md:px-16"
      >
        {/* Story Section in Editorial Headline Font & Style */}
        <div
          ref={aboutStoryRef}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            willChange: "opacity, transform",
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
      </section>

      {/* Three Everyday Buyers Section (Dedicated Full Viewport Pinned Scroll Stage) */}
      <section
        ref={buyersSectionRef}
        style={{
          position: "relative",
          zIndex: 48,
          backgroundColor: "#FAF7F5",
          height: "100vh",
          width: "100%",
          padding: "5rem 4rem 3rem 4rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
        className="px-6 sm:px-12 md:px-16"
      >
        <div style={{ width: "100%", maxWidth: "1350px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              fontSize: "clamp(1.05rem, 1.5vw, 1.45rem)",
              fontWeight: 500,
              color: "rgba(85, 8, 24, 0.88)",
              letterSpacing: "-0.015em",
              marginBottom: "2.5rem",
              textAlign: "left",
            }}
          >
            Three everyday buyers who shape how MABZUL looks, sounds and serves.
          </p>

          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "2rem",
              alignItems: "start",
            }}
            className="grid-cols-1 md:grid-cols-3"
          >
            {/* Step 1: THE THOUGHTFUL HOST (Static left card) */}
            <div
              ref={card1Ref}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
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
                    padding: "2.2rem 1.8rem 2.4rem 1.8rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.8rem",
                    flex: 1,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "clamp(1.3rem, 1.6vw, 1.55rem)",
                        fontWeight: 800,
                        lineHeight: 1.22,
                        letterSpacing: "0.02em",
                        color: "#550818",
                        margin: "0 0 0.85rem 0",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {"THE\nTHOUGHTFUL\nHOST"}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "0.98rem",
                        lineHeight: 1.5,
                        color: "rgba(85, 8, 24, 0.85)",
                        margin: 0,
                      }}
                    >
                      Welcomes family and guests often and wants something generous to put on the table.
                    </p>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#550818",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      WANTS
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        color: "rgba(85, 8, 24, 0.85)",
                        margin: 0,
                      }}
                    >
                      Quality they are proud to serve, presented with care.
                    </p>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#550818",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      WORRIES ABOUT
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        color: "rgba(85, 8, 24, 0.85)",
                        margin: 0,
                      }}
                    >
                      Gifts and treats that feel generic.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: THE CORPORATE GIFTER (Pulled up on scroll) */}
            <div
              ref={card2Ref}
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                willChange: "transform, opacity",
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
                    padding: "2.2rem 1.8rem 2.4rem 1.8rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.8rem",
                    flex: 1,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "clamp(1.3rem, 1.6vw, 1.55rem)",
                        fontWeight: 800,
                        lineHeight: 1.22,
                        letterSpacing: "0.02em",
                        color: "#550818",
                        margin: "0 0 0.85rem 0",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {"THE\nCORPORATE\nGIFTER"}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "0.98rem",
                        lineHeight: 1.5,
                        color: "rgba(85, 8, 24, 0.85)",
                        margin: 0,
                      }}
                    >
                      Buys for clients, teams and events, and needs gifts that look professional.
                    </p>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#550818",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      WANTS
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        color: "rgba(85, 8, 24, 0.85)",
                        margin: 0,
                      }}
                    >
                      Presentable, easy to order, consistent every time.
                    </p>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#550818",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      WORRIES ABOUT
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        color: "rgba(85, 8, 24, 0.85)",
                        margin: 0,
                      }}
                    >
                      Options that feel too formal, or service that lets them down.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: THE EVERYDAY TREATER (Pulled up on scroll) */}
            <div
              ref={card3Ref}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                willChange: "transform, opacity",
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
                    padding: "2.2rem 1.8rem 2.4rem 1.8rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.8rem",
                    flex: 1,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "clamp(1.3rem, 1.6vw, 1.55rem)",
                        fontWeight: 800,
                        lineHeight: 1.22,
                        letterSpacing: "0.02em",
                        color: "#550818",
                        margin: "0 0 0.85rem 0",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {"THE\nEVERYDAY\nTREATER"}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "0.98rem",
                        lineHeight: 1.5,
                        color: "rgba(85, 8, 24, 0.85)",
                        margin: 0,
                      }}
                    >
                      Enjoys good dates, nuts and chocolates for themselves.
                    </p>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#550818",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      WANTS
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        color: "rgba(85, 8, 24, 0.85)",
                        margin: 0,
                      }}
                    >
                      A small, well-chosen treat that feels like a moment.
                    </p>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#550818",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      WORRIES ABOUT
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        color: "rgba(85, 8, 24, 0.85)",
                        margin: 0,
                      }}
                    >
                      Everyday shops with little care in presentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pinned Scroll Transition Stage: About -> Contact (Exact replica of Home -> About video animation) */}
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

      {/* Embedded Contact Section (Seamless transition after pinned expansion) */}
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
      </section>

      {/* Footer Section (Below the Pinned Stage) */}
      <footer
        style={{
          width: "100%",
          padding: "2.5rem 4rem 3.5rem 4rem",
          backgroundColor: "#FAF7F5",
          borderTop: "1px solid rgba(85, 8, 24, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 50,
          boxSizing: "border-box",
        }}
        className="px-6 sm:px-12 md:px-16"
      >
        <div style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#550818" }}>
          MABZUL&reg; 2026
        </div>
      </footer>

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
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onClick={() => {
                setDrawerOpen(false);
              }}
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

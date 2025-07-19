"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import Image from "next/image";
import { useTheme } from "next-themes";

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: { text: string; href: string }[];
  image: {
    light: string;
    dark: string;
    alt: string;
  };
}

export function HeroSection({
  badge,
  title,
  description,
  actions,
  image,
}: HeroProps) {
  const { resolvedTheme } = useTheme();
  const imageSrc = resolvedTheme === "dark" ? image.dark : image.light;

  return (
    <section
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        padding: "0 1rem",
        width: "100%",
      }}
      className="relative overflow-hidden pb-0"
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
          paddingTop: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            textAlign: "center",
            width: "100%",
          }}
        >
          {/* Badge */}
          {badge && (
            <Badge variant="hero">
              <span>{badge.text}</span>
              <a
                href={badge.action.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  marginLeft: 8,
                }}
              >
                {badge.action.text}
                <ArrowRightIcon style={{ width: 12, height: 12 }} />
              </a>
            </Badge>
          )}
          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              lineHeight: 1.1,
              color: "var(--foreground)",
              margin: 0,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}
          >
            {title}
          </h1>
          {/* Description */}
          <p
            style={{
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "1.25rem",
              maxWidth: 550,
              margin: "0 auto",
            }}
          >
            {description}
          </p>
          {/* Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginTop: 16,
            }}
          >
            {actions.map((action, idx) => (
              <Button key={idx} asChild variant="default">
                <a href={action.href}>{action.text}</a>
              </Button>
            ))}
          </div>
          {/* Image */}
          <div
            style={{
              position: "relative",
              paddingTop: 48,
              width: "100vw",
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            <MockupFrame
              className="opacity-100"
              size="small"
              style={{ width: "100vw", maxWidth: "1400px", margin: "0 auto" }}
            >
              <Mockup
                type="responsive"
                style={{ width: "100vw", maxWidth: "1400px", margin: "0 auto" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1248/765",
                    minHeight: 320,
                  }}
                >
                  <Image
                    src={imageSrc}
                    alt={image.alt}
                    fill
                    priority
                    style={{
                      borderRadius: "var(--radius-lg)",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </Mockup>
            </MockupFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

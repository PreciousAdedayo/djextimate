import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0906",
        void: "#050403",
        surface: "#12100C",
        raised: "#1A1712",
        bone: "#F3EEE4",
        stone: "#948C7E",
        line: "rgba(243,238,228,0.10)",
        ember: {
          DEFAULT: "#FF5A1F",
          light: "#FF7A3D",
          dark: "#D6430F",
        },
        amber: "#FFB25B",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "ember-glow":
          "radial-gradient(60% 60% at 78% 30%, rgba(255,90,31,0.35) 0%, rgba(255,90,31,0) 70%)",
        "ember-sweep":
          "linear-gradient(135deg, #D6430F 0%, #FF5A1F 45%, #FFB25B 100%)",
        grain: "url('/noise.svg')",
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      keyframes: {
        pulseBar: {
          "0%, 100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulseBar: "pulseBar 1.1s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        floatSlow: "floatSlow 7s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;

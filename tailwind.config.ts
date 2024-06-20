import { type Config, PluginAPI } from "tailwindcss/types/config";

const plugin = require("tailwindcss/plugin");

// types files path
// node_modules/tailwindcss/types/index.d.ts
// node_modules/tailwindcss/types/config.d.ts

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./library/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./modules/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "460px",
        "3xl": "1600px",
      },
      spacing: {
        26: "104px",
      },
      maxWidth: {
        var: "var(--max-w-1, var(--max-w-2, var(--max-w-3, var(--max-w-sub))))",
      },
      fontSize: {
        h1: [
          "clamp(18px, 17px + 4vw, 4rem)",
          {
            lineHeight: "1.35",
          },
        ],
        h2: [
          "clamp(16px, 16px + 3.5vw, 3.5rem)",
          {
            lineHeight: "1.25",
          },
        ],
        h3: [
          "clamp(14px, 14px + 3vw, 3rem)",
          {
            lineHeight: "1.2",
          },
        ],
        h4: [
          "clamp(13px, 12px + 2.75vw, 2rem)",
          {
            lineHeight: "1.2",
          },
        ],
        h5: [
          "clamp(13px, 10px + 2vw, 1.5rem)",
          {
            lineHeight: "1.25",
          },
        ],
        h6: [
          "clamp(13px, 10px + 1vw, 1.25rem)",
          {
            lineHeight: "1.35",
          },
        ],
        paragraph: [
          "clamp(0.925rem, 0.925rem + 1vw, 1rem)",
          {
            lineHeight: "1.75rem",
          },
        ],
        span: [
          "clamp(0.725rem, 0.45rem + 0.5vw, 0.895rem)",
          {
            lineHeight: "1.35",
          },
        ],
      },
      borderRadius: {
        "2xl": "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 2px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: "hsl(var(--muted-foreground))",
        color: {
          DEFAULT: "hsl(var(--color))",
          muted: "hsl(var(--color-muted))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          theme: "hsl(var(--background-theme))",
          box: "hsl(var(--background-box))",
          nav: "hsl(var(--background-nav))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          emphasis: "hsl(var(--destructive-emphasis))",
        },
        constructive: {
          DEFAULT: "hsl(var(--constructive))",
          foreground: "hsl(var(--constructive-foreground))",
          emphasis: "hsl(var(--constructive-emphasis))",
        },
        conservative: {
          DEFAULT: "hsl(var(--conservative))",
          foreground: "hsl(var(--conservative-foreground))",
          emphasis: "hsl(var(--conservative-emphasis))",
        },
        primitive: {
          DEFAULT: "hsl(var(--primitive))",
          foreground: "hsl(var(--primitive-foreground))",
          emphasis: "hsl(var(--primitive-emphasis))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          emphasis: "hsl(var(--muted-emphasis))",
        },
        mention: {
          DEFAULT: "hsl(var(--mention))",
          foreground: "hsl(var(--mention-foreground))",
          emphasis: "hsl(var(--mention-emphasis))",
        },
      },
      backgroundImage: {
        "danger-area": "repeating-linear-gradient(var(--danger-bg-image))",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "scale3d(0, 0, 0)" },
          to: { opacity: "1", transform: "scale3d(1, 1, 1)" },
        },
        "fade-out": {
          from: { opacity: "1", transform: "scale3d(1, 1, 1)" },
          to: { opacity: "0", transform: "scale3d(0, 0, 0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "bounce-in": {
          "0%": { opacity: "0", scale: "1.3" },
          "50%": { opacity: "0.8", scale: "0.7" },
          "80%": { opacity: "9", scale: "0.8" },
          "100%": { opacity: "1", scale: "1" },
        },
        "bounce-out": {
          "0%": { opacity: "0", scale: "0.3" },
          "50%": { opacity: "0.8", scale: "1.2" },
          "80%": { opacity: "9", scale: "0.8" },
          "100%": { opacity: "1", scale: "1" },
        },
        "wave-in": { "50%": { transform: "scale(0.85)" } },
        "wave-out": { "50%": { transform: "scale(1.2)" } },
        "opacity-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "opacity-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "pulse-1": { "0%,16.667%,to": { opacity: "1" }, "33.333%,83.333%": { opacity: "0" } },
        "pulse-2": {
          "0%,to": { opacity: "0" },
          "33.333%,50%": { opacity: "1" },
          "16.667%,66.667%": { opacity: "0" },
        },
        "pulse-3": { "0%,50%,to": { opacity: "0" }, "66.667%,83.333%": { opacity: "1" } },
        "pulse-4": { "0%, 16.667%, 100%": { opacity: "1" }, "33%, 83.333%": { opacity: "0" } },
        "pulse-5": {
          "0%, 16.667%, 66.667%, 100%": { opacity: "0" },
          "33.333%, 50%": { opacity: "1" },
        },
        "pulse-6": { "0%, 50%, 100%": { opacity: "0" }, "66.667%, 83.333%": { opacity: "1" } },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-in forwards",
        "fade-out": "fade-out 0.2s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-in": "bounce-in 0.5s linear forwards 0.3s",
        "bounce-out": "bounce-out 0.5s linear forwards 0.3s",
        "wave-in": "wave-in 0.4s ease forwards",
        "wave-out": "wave-out 0.4s ease forwards",
        enter: "enter ease forwards",
        exit: "exit ease forwards",
        "pulse-1": "pulse-1 8s infinite",
        "pulse-2": "pulse-2 8s infinite",
        "pulse-3": "pulse-3 8s infinite",
        "pulse-4": "pulse-4 8s infinite",
        "pulse-5": "pulse-5 8s infinite",
        "pulse-6": "pulse-6 8s infinite",
      },
      transitionProperty: {
        spacing: "margin, padding",
      },
      transitionDuration: {
        "500": "500ms",
        "1000": "1000ms",
      },
      transitionTimingFunction: {
        ease: "ease",
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      fontFamily: {
        "anek-telugu": ["var(--ff-anek-telugu)"],
        amiri: ["var(--ff-amiri)"],
        inter: ["var(--ff-inter)"],
        kanit: ["var(--ff-kanit)"],
        koulen: ["var(--ff-koulen)"],
        montserrat: ["var(--ff-montserrat)"],
        poppins: ["var(--ff-poppins)"],
        "roboto-mono": ["var(--ff-roboto-mono)"],
        "special-elit": ["var(--ff-special-elit)"],
      },
      zIndex: {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "10": "10",
        "11": "11",
        "19": "19",
        "20": "20",
        "21": "21",
        "29": "29",
        "30": "30",
        "99": "99",
        "999": "999",
        "9999": "9999",
        "99999": "99999",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addBase, addUtilities }: PluginAPI) => {
      addBase({});
      addUtilities({
        ".scrollbar": {
          scrollbarColor: "var(--scroll-color, #adb3bd) var(--scroll-bg, #0000)",
          scrollbarWidth: "var(--scroll-w, thin)",
          scrollbarGutter: "auto",
        },
        ".webkit-scrollbar": {
          "&::-webkit-scrollbar": {
            width: "var(--scroll-sz, 0px)",
            height: "var(--scroll-sz, 0px)",
            borderRadius:
              "var(--scroll-rd-tl, var(--scroll-rd-t, var(--scroll-rd-l, var(--scroll-rd, 999px)))) var(--scroll-rd-tr, var(--scroll-rd-t, var(--scroll-rd-r, var(--scroll-rd, 999px)))) var(--scroll-rd-br, var(--scroll-rd-b, var(--scroll-rd-r, var(--scroll-rd, 999px)))) var(--scroll-rd-bl, var(--scroll-rd-b, var(--scroll-rd-l, var(--scroll-rd, 999px))))",
          },
          "&::-webkit-scrollbar-track": {
            background: "var(--scroll-bg, #0000)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "var(--scroll-color, #0000)",
            borderRadius:
              "var(--scroll-rd-tl, var(--scroll-rd-t, var(--scroll-rd-l, var(--scroll-rd, 999px)))) var(--scroll-rd-tr, var(--scroll-rd-t, var(--scroll-rd-r, var(--scroll-rd, 999px)))) var(--scroll-rd-br, var(--scroll-rd-b, var(--scroll-rd-r, var(--scroll-rd, 999px)))) var(--scroll-rd-bl, var(--scroll-rd-b, var(--scroll-rd-l, var(--scroll-rd, 999px))))",
          },
        },
        ".sizer": {
          width: "var(--sz--w, var(--sz-w, var(--sz)))",
          minWidth: "var(--sz-miw, var(--sz-min, var(--sz-w, var(--sz))))",
          maxWidth: "var(--sz-maw, var(--sz-max, var(--sz-w, var(--sz))))",
          height: "var(--sz--h, var(--sz-h, var(--sz)))",
          minHeight: "var(--sz-mih, var(--sz-min, var(--sz-h, var(--sz))))",
          maxHeight: "var(--sz-mah, var(--sz-max, var(--sz-h, var(--sz))))",
        },
        ".unmounted": {
          height: "0px",
          width: "0px",
          overflow: "hidden",
          opacity: "0",
          scale: "0",
          display: "none",
        },
        ".underline-hover": {
          position: "relative",
          touchAction: "manipulation",
          "&:hover": {
            "&::before": {
              transform: "scaleX(1)",
              transformOrigin: "left center",
            },
          },
          "&::before": {
            position: "absolute",
            bottom: "var(--underline-offset, 2px)",
            left: "0",
            width: "100%",
            backgroundColor: "currentColor",
            content: '""',
            height: "1px",
            transform: "scaleX(0)",
            transformOrigin: "right center",
            transition: "transform .45s cubic-bezier(0.86, 0, 0.07, 1)",
          },
        },
        ".centered, .center-left, .center-right": {
          display: "flex",
          alignItems: "center",
        },
        ".centered": {
          justifyContent: "center",
        },
        ".center-left": {
          justifyContent: "flex-start",
        },
        ".center-right": {
          justifyContent: "flex-end",
        },
        ".center-top": {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        },
        ".center-bottom": {
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        },
        ".h-inherit": {
          height: "inherit",
        },
        ".w-inherit": {
          width: "inherit",
        },
        ".inherit": {
          display: "inherit",
        },
        ".pos-inherit": {
          position: "inherit",
        },
        ".grid-area-1": {
          gridArea: "1/1",
        },
        ".visible-hidden": {
          visibility: "hidden",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".backface-visible": {
          backfaceVisibility: "visible",
        },
        ".decoration-none": {
          textDecoration: "none",
        },
        ".text-pre-line": {
          whiteSpace: "pre-line",
        },
        ".text-pre-wrap": {
          whiteSpace: "pre-wrap",
        },
        ".text-break-spaces": {
          whiteSpace: "break-spaces",
        },
        ".filter-icon": {
          filter: "var(--filter-icon)",
        },
        ".filter-icon-foreground": {
          filter: "var(--filter-icon-foreground)",
        },
        ".occure_load": {
          transformOrigin: "center",
          animation: "hop-arround 2s infinite",
        },
      });
    }),
  ],
} satisfies Config;

export default config;

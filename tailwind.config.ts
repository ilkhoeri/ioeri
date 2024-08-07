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
    "./resource/**/*.{js,jsx,ts,tsx,md,mdx}",
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
      borderRadius: {
        "2xl": "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 2px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        code: "hsl(var(--code))",
        border: "hsl(var(--border))",
        color: {
          DEFAULT: "hsl(var(--color))",
          muted: "hsl(var(--color-muted))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          theme: "hsl(var(--background-theme))",
          box: "hsl(var(--background-box))",
          nav: "hsl(var(--background-nav))",
          muted: "hsl(var(--background-muted))",
          "code-header": "hsl(var(--background-code-header))",
          "code-body": "hsl(var(--background-code-body))",
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
        "cursor-bar": { "50%": { borderRightColor: "transparent" } },
        "cursor-blink": {
          "20%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0)" },
          "80%": { transform: "scaleY(1)" },
        },
        "fade-in": {
          from: { opacity: "var(--tw-enter-opacity, initial)", scale: "var(--tw-enter-scale, initial)" },
        },
        "fade-out": {
          to: { opacity: "var(--tw-exit-opacity, initial)", scale: "var(--tw-exit-scale, initial)" },
        },
        "collapse-open": {
          from: { height: "0" },
          to: { height: "var(--measure-available-h)" },
        },
        "collapse-closed": {
          from: { height: "var(--measure-available-h)" },
          to: { height: "0", visibility: "hidden" },
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
        "cursor-bar": "cursor-bar 0.5s step-end infinite alternate, cursor-blink 0.5s infinite",
        "collapse-open": "collapse-open 0.2s ease forwards",
        "collapse-closed": "collapse-closed 0.2s ease forwards",
        "fade-in": "fade-in ease-in forwards",
        "fade-out": "fade-out ease-out forwards",
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
            borderRadius: "var(--scroll-rounded, 9999px)",
          },
          "&::-webkit-scrollbar-track": {
            background: "var(--scroll-bg, #0000)",
          },
          "&::-webkit-scrollbar-thumb": {
            cursor: "grab",
            background: "var(--scroll-color, #0000)",
            borderRadius: "var(--scroll-rounded, 9999px)",
          },
          "&:hover": {
            "&::-webkit-scrollbar-thumb": {
              background: "var(--scroll-color-hover, var(--scroll-color, #0000))",
            },
          },
          "&::-webkit-scrollbar-thumb:active": {
            cursor: "grabbing",
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
        ".text-h1": {
          fontSize: "clamp(20px, 0.75rem + 4vw, 2.25rem)",
          lineHeight: "2.5rem",
        },
        ".text-h2": {
          fontSize: "clamp(18px, 11px + 3.5vw, 1.875rem)",
          lineHeight: "2.25rem",
        },
        ".text-h3": {
          fontSize: "clamp(17px, 14px + 3vw, 1.5rem)",
          lineHeight: "2rem",
        },
        ".text-h4": {
          fontSize: "clamp(1rem, 0.75rem + 2vw, 1.35rem)",
          lineHeight: "1.75rem",
        },
        ".text-h5": {
          fontSize: "clamp(1rem, 0.85rem + 2vw, 1.3rem)",
          lineHeight: "1.5",
        },
        ".text-h6": {
          fontSize: "clamp(1rem, 0.75rem + 1vw, 1.25rem)",
          lineHeight: "1.5",
        },
        ".text-paragraph": {
          fontSize: "clamp(0.925rem, 0.925rem + 1vw, 1rem)",
          lineHeight: "1.75rem",
        },
        ".text-span": {
          fontSize: "clamp(0.75rem, 0.65rem + 0.65vw, 0.9rem)",
          lineHeight: "1.35",
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
        ".white-space-pre-line": {
          whiteSpace: "pre-line",
        },
        ".white-space-pre-wrap": {
          whiteSpace: "pre-wrap",
        },
        ".white-space-break-spaces": {
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

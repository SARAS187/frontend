/** @type {import('tailwindcss').Config} */

import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";
import { color } from "framer-motion";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: '1rem',
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      
      colors: {
        destructive: '#dc2626', // Tailwind red-600
      'destructive-foreground': '#ffffff',
        // background: "hsl(var(--background))",
        // foreground: "hsl(var(--foreground))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        toast: {
        background:"red",
          // background: "rgba(0,0,0,0.75)", // fallback transparent dark
          foreground: "#ffffff",
          success: "rgba(34,197,94,0.85)", // green-500
          error: "rgba(239,68,68,0.85)",   // red-500
        },
      },
      // keyframes: {
      //   fadeIn: {
      //     '0%': { opacity: '0', transform: 'translateY(10px)' },
      //     '100%': { opacity: '1', transform: 'translateY(0)' },
      //   },
      //   fadeOut: {
      //     '0%': { opacity: '1', transform: 'translateY(0)' },
      //     '100%': { opacity: '0', transform: 'translateY(-10px)' },
      //   },
      // },
      // animation: {
      //   fadeIn: 'fadeIn 0.3s ease-out',
      //   fadeOut: 'fadeOut 0.3s ease-in',
      // },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-zoom": {   
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-zoom": "pulse-zoom 1.5s ease-in-out infinite",  
      },    
    },
  },
  plugins: [
    animate,
    typography,
  ],
};


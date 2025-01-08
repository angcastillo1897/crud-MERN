/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: {
          1: "hsl(var(--color-accent1) / <alpha-value>)",
        },
        bkg: "hsl(var(--color-bkg) / <alpha-value>)",
        bkgNav: "hsl(var(--color-bkg-nav) / <alpha-value>)",
        bkgNavHover: "hsl(var(--color-bkg-nav-hover) / <alpha-value>)",
        content: "hsl(var(--color-content) / <alpha-value>)",
        bkgCard: "hsl(var(--color-bkg-card) / <alpha-value>)",
        bkgInvoice: "hsl(var(--color-bkg-invoice) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}


const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#8C272B",
        secondary: "#F5F5DC",
        background: "#FDFDFD",
        textColor: "#333333",
        borderColor: "#EAEAEA",
        dark: {
          primary: "#E57373",
          background: "#121212",
          textColor: "#e0e0e0",
          borderColor: "#424242",
        },
      },
      fontFamily: {
        sans: ["DM Mono", ...defaultTheme.fontFamily.sans],
        serif: ["Noto Serif Display", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};

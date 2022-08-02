module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      ringColor: ["responsive", "dark", "focus-within", "focus"],
      ringOffsetColor: ["responsive", "dark", "focus-within", "focus"],
      ringOffsetWidth: ["responsive", "focus-within", "focus"],
      ringOpacity: ["responsive", "dark", "focus-within", "focus"],
      ringWidth: ["responsive", "focus-within", "focus"],
      margin: ["first", "last"],
      backdropBlur: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};

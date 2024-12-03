module.exports = {
  darkMode: 'class', // ou 'media' selon votre préférence
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./assets/components/*.{js,jsx,ts,tsx}",
    "./assets/components/ui/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
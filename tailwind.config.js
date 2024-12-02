module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./assets/components/*.{js,jsx,ts,tsx}",
    "./assets/components/ui/*.{js,jsx,ts,tsx}",
    "./assets/pages/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
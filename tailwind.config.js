module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  variants: {
    extend: {
      borderColor: ["last"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

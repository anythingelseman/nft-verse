module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderColor: ["last"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

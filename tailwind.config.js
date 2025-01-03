
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1e429f',
      },
      zIndex: {
        50: "50",
    },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust according to your project structure
    flowbite.content(),

  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),

  ],
};


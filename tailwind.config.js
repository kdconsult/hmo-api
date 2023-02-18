/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/projects/**/src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

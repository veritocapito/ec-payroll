/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E40AF',
        'secondary': '#3B82F6',
        'accent': '#FF8C00',
        'accentDark': '#E67D00',      
        'neutralDark': '#334155',   
        'neutralLight': '#F1F5F9',   
        'success': '#25D366',
        'danger': '#EF4444',
        'footerDark': '#040504', 
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'serif': ['Lora', 'serif'],
      }
    },
  },
  plugins: [],
}
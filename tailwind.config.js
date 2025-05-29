/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Asegúrate de que esto cubra tus archivos Vue
  ],
  darkMode: 'class', // Habilitar el modo oscuro basado en una clase en el elemento HTML
  theme: {
    extend: {
      colors: {
        'text': {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)', // Ejemplo de variante para texto
        },        // Fondo
        'background': {
          DEFAULT: 'var(--background)',
          alt: 'var(--background-alt)', // Ejemplo de variante para fondo
        },
        // Primario
        'primary': {
          DEFAULT: 'var(--primary-500)', // O simplemente 'var(--primary)' si renombras --primary a --primary-500
          300: 'var(--primary-300)',
          500: 'var(--primary-500)',
          700: 'var(--primary-700)',
        },
        // Secundario
        'secondary': {
          DEFAULT: 'var(--secondary-500)',
          300: 'var(--secondary-300)',
          500: 'var(--secondary-500)',
          700: 'var(--secondary-700)',
        },
        // Acento
        'accent': {
          DEFAULT: 'var(--accent-500)',
          300: 'var(--accent-300)',
          500: 'var(--accent-500)',
          700: 'var(--accent-700)',
        },
      },
    },
  },
  plugins: [],
}
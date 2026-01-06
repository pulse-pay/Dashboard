/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1d4ed8',
        'primary-light': '#3b82f6',
        secondary: '#64748b',
        'secondary-light': '#94a3b8',
        background: '#f8fafc',
        surface: '#ffffff',
        border: '#e2e8f0',
        text: '#1e293b',
        'text-secondary': '#64748b',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
    },
  },
  plugins: [],
}


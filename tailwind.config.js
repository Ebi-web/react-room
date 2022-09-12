module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#E7D873',
        sub: '#000F14',
        green: '#2CA58D',
        white: '#F7F7F5',
        blue: '#8075FF',
        task: '#F6F4F5',
      },
      fontFamily: {
        Shippori: ['Shippori Mincho'],
        Cormorant: ['Cormorant SC'],
        Pacifico: ['Pacifico'],
      },
    },
    screens: {
      sm: { max: '440px' },
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          50: 'rgba(244,255,247,1)',
          600: 'rgba(75,85,99,1)',
          700: 'rgba(55,65,81,1)',
          800: 'rgba(31,41,55,1)'
        },
        amber: {
          100: 'rgba(254,243,199,1)',
          900: 'rgba(146,64,15,1)'
        },
        green: {
          100: 'rgba(222,247,236,1)',
          800: 'rgba(3,84,63,1)'
        },
        red: {
          100: 'rgba(253,226,225,1)',
          800: 'rgba(152,27,28,1)'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'helvetica-neue': ['Helvetica Neue', 'sans-serif']
      },
      keyframes: {
        glitch: {
          '0%': {
            clipPath: 'inset(0% 0 0 0)',
            textShadow: '2px 0 rgb(168, 28, 203)'
          },
          '25%': {
            clipPath: 'inset(10% 0 60% 0)',
            textShadow: '2px 0 hsl(299, 92.90%, 50.40%)'
          },
          '50%': {
            clipPath: 'inset(20% 0 50% 0)',
            textShadow: '2px 0 rgb(237, 30, 82)'
          },
          '75%': {
            clipPath: 'inset(15% 0 55% 0)',
            textShadow: '2px 0 rgb(15, 228, 196)'
          },
          '100%': {
            clipPath: 'inset(0% 0 0 0)',
            textShadow: '2px 0 rgba(46, 251, 97, 0.8)'
          }
        }
      },
      animation: {
        'glitch-after':
          'glitch var(--after-duration, 1s) infinite linear alternate-reverse',
        'glitch-before':
          'glitch var(--before-duration, 0.75s) infinite linear alternate-reverse'
      }
    }
  },
plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]

}

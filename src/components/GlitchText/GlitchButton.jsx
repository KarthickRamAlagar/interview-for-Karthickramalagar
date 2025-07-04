const GradientShadowButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className='
      relative inline-block px-6 py-3 font-semibold text-white rounded-lg
      bg-gradient-to-r from-green-400 via-blue-500 to-purple-600
      shadow-lg transition-transform duration-300
      before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r from-green-400 via-blue-500 to-purple-600
      before:opacity-0 before:blur-xl before:scale-110
      hover:before:opacity-60 hover:before:scale-100
      hover:scale-105
      focus:outline-none focus:ring-4 focus:ring-blue-300
    '
  >
    {children}
  </button>
)

export default GradientShadowButton

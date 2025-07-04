const GlitchText = ({
  text,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = ''
}) => {
  const inlineStyles = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-2px 0 #d4ffbc' : 'none',
    '--before-shadow': enableShadows ? '2px 0 #fff4b3' : 'none'
  }

  const baseClasses = 'relative font-black select-none cursor-pointer'

  const glitchClasses = !enableOnHover
    ? 'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[2px] after:text-inherit after:bg-black after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:glitch-after ' +
      'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-2px] before:text-inherit before:bg-black before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:glitch-before'
    : 'hover:after:content-[attr(data-text)] hover:after:absolute hover:after:top-0 hover:after:left-[2px] hover:after:glitch-after ' +
      'hover:before:content-[attr(data-text)] hover:before:absolute hover:before:top-0 hover:before:left-[-2px] hover:before:glitch-before'

  return (
    <div
      data-text={text}
      style={inlineStyles}
      className={`${baseClasses} ${glitchClasses} ${className}`}
    >
      {text}
    </div>
  )
}

export default GlitchText

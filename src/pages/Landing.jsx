import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FalconHeavy from '../assets/images/FalconHeavy.png'
import GlitchText from '../components/GlitchText/GlitchText'
import GlitchButton from '../components/GlitchText/GlitchButton'

const Landing = () => {
  const navigate = useNavigate()
  const [showCTA, setShowCTA] = useState(false)
  const [stats, setStats] = useState({ launches: 0, landings: 0, reflights: 0 })

  const launchRef = useRef(null)
  const landRef = useRef(null)
  const reflightRef = useRef(null)
  const statsSectionRef = useRef(null)

  const footerLinks = [
    {
      name: 'Privacy Policy',
      url: 'https://www.spacex.com/legal/privacy-policy/'
    },
    { name: 'Twitter', url: 'https://twitter.com/SpaceX' },
    { name: 'YouTube', url: 'https://www.youtube.com/spacex' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/spacex' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchLaunchStats = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v4/launches')
        const data = await response.json()

        const totalLaunches = data.length
        const totalLandings = data.filter(launch =>
          launch.cores.some(core => core.landing_success)
        ).length
        const totalReflights = new Set(data.map(launch => launch.rocket)).size

        const newStats = {
          launches: totalLaunches,
          landings: totalLandings,
          reflights: totalReflights
        }

        setStats(newStats)
        countUp(newStats)
      } catch (error) {
        console.error('Error fetching SpaceX launch data:', error)
      }
    }

    fetchLaunchStats()
  }, [])

  const countUp = ({ launches, landings, reflights }) => {
    const targets = [
      { ref: launchRef, target: launches },
      { ref: landRef, target: landings },
      { ref: reflightRef, target: reflights }
    ]

    targets.forEach(({ ref, target }) => {
      let count = 0
      const step = Math.ceil(target / 100)
      const interval = setInterval(() => {
        count += step
        if (count >= target) {
          count = target
          clearInterval(interval)
        }
        if (ref.current) {
          ref.current.innerText = count
        }
      }, 30)
    })
  }

  const scrollToStats = () => {
    statsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='relative min-h-screen bg-black text-white overflow-hidden'>
      {/* Background */}
      <img
        src={FalconHeavy}
        className='absolute inset-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none'
        alt='Falcon Heavy'
      />

      {/* Title */}
      <div className='absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[10]'>
        <GlitchText
          text='SpaceX'
          className='text-7xl md:text-9xl font-extrabold tracking-widest text-green-400'
        />
        <p className='mt-4 text-lg md:text-xl font-light text-white'>
          Falcon Heavy — The world’s most powerful rocket
        </p>
      </div>

      {/* Stats Section */}
      <div
        ref={statsSectionRef}
        className='relative mt-[30rem] sm:mt-[35rem] md:mt-[32rem] w-full flex flex-col items-center gap-12 text-center text-white text-xl px-4'
      >
        <div className='flex flex-col sm:flex-row justify-center gap-12'>
          <div className='transition duration-300 transform hover:scale-110 hover:text-yellow-400'>
            <div
              ref={launchRef}
              className='text-6xl md:text-7xl font-extrabold'
            >
              0
            </div>
            <p className='uppercase text-sm text-gray-400 mt-1'>
              Total Launches
            </p>
          </div>
          <div className='transition duration-300 transform hover:scale-110 hover:text-yellow-400'>
            <div ref={landRef} className='text-6xl md:text-7xl font-extrabold'>
              0
            </div>
            <p className='uppercase text-sm text-gray-400 mt-1'>
              Total Landings
            </p>
          </div>
          <div className='transition duration-300 transform hover:scale-110 hover:text-yellow-400'>
            <div
              ref={reflightRef}
              className='text-6xl md:text-7xl font-extrabold'
            >
              0
            </div>
            <p className='uppercase text-sm text-gray-400 mt-1'>
              Total Reflights
            </p>
          </div>
        </div>

        {/* CTA */}
        {showCTA && (
          <div className='mt-12 -ml-5'>
            <GlitchButton onClick={() => navigate('/dashboard')}>
              Get Started →
            </GlitchButton>
          </div>
        )}
      </div>

      {/* Footer */}
      {/* Footer */}
      <footer
        className={`w-full text-center text-sm sm:text-base text-gray-400 py-6 ${
          showCTA
            ? 'mt-10 sm:mt-17 md:mt-24 lg:mt-32'
            : 'mt-20 sm:mt-24 md:mt-32 lg:mt-40'
        }`}
      >
        <span>SpaceX © {new Date().getFullYear()} •</span>
        <ul className='inline-flex flex-wrap justify-center items-center gap-1 sm:gap-2 ml-1'>
          {footerLinks.map(({ name, url }, index) => (
            <li key={name} className='inline'>
              <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-white cursor-pointer px-1'
              >
                {name}
              </a>
              {index !== footerLinks.length - 1 && <span>•</span>}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  )
}

export default Landing

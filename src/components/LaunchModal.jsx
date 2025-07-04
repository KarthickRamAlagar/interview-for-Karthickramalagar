import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  CircularProgress
} from '@mui/material'
import { Close } from '@mui/icons-material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import youtubeIcon from '../assets/images/Youtube.png'
import wikipediaIcon from '../assets/images/Wikipedia.png'
import nasaIcon from '../assets/images/NASA.png'

const LaunchModal = ({ open, onClose, launch }) => {
  const [rocketData, setRocketData] = useState(null)
  const [payloadData, setPayloadData] = useState(null)
  const [padData, setPadData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!launch) return

    setLoading(true)
    const fetchAll = async () => {
      try {
        const [rocketRes, payloadRes, padRes] = await Promise.all([
          launch.rocket ? fetch(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`) : null,
          launch.payloads?.[0] ? fetch(`https://api.spacexdata.com/v4/payloads/${launch.payloads[0]}`) : null,
          launch.launchpad ? fetch(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`) : null
        ])

        const [rocket, payload, pad] = await Promise.all([
          rocketRes?.ok ? rocketRes.json() : null,
          payloadRes?.ok ? payloadRes.json() : null,
          padRes?.ok ? padRes.json() : null
        ])

        setRocketData(rocket)
        setPayloadData(payload)
        setPadData(pad)
      } catch (err) {
        console.error('LaunchModal fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [launch])

  if (!launch || loading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ py: 6, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Loading mission details...
          </Typography>
        </DialogContent>
      </Dialog>
    )
  }

  const launchDetails = [
    ['Flight Number', launch.flight_number ?? '—'],
    ['Mission Name', launch.name ?? '—'],
    ['Rocket Type', rocketData?.type ?? '—'],
    ['Rocket Name', rocketData?.name ?? '—'],
    ['Manufacturer', rocketData?.company ?? 'SpaceX'],
    ['Nationality', payloadData?.nationalities?.[0] ?? 'SpaceX'],
    ['Launch Date', dayjs(launch.date_utc).format('DD MMMM YYYY HH:mm')],
    ['Payload Type', payloadData?.type ?? '—'],
    ['Orbit', payloadData?.orbit ?? '—'],
    ['Launch Site', padData?.name ?? '—']
  ]

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex justify-between items-start">
        <div className="flex gap-4 w-full">
          <div className="w-[72px] h-[72px] rounded-md flex items-center justify-center shrink-0 bg-gray-100 overflow-hidden">
            <img
              src={launch.links?.patch?.large || nasaIcon}
              alt="Mission Patch"
              className="w-[72px] h-[72px] object-contain"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
                {launch.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 500,
                  px: 1,
                  py: 0.5,
                  borderRadius: '50px',
                  color: launch.success ? 'green' : 'red',
                  backgroundColor: launch.success ? '#e6f4ea' : '#fdecea'
                }}
              >
                {launch.success ? 'Success' : launch.upcoming ? 'Upcoming' : 'Failed'}
              </Typography>
            </div>
            <Typography sx={{ fontSize: '14px', color: '#6b7280', mt: 0.5 }}>
              {dayjs(launch.date_utc).format('MMMM D, YYYY')}
            </Typography>
            <div className="flex gap-4 pt-2">
              {launch.links?.wikipedia && (
                <a href={launch.links.wikipedia} target="_blank" rel="noreferrer">
                  <img src={wikipediaIcon} alt="Wikipedia" width={16} />
                </a>
              )}
              {launch.links?.webcast && (
                <a href={launch.links.webcast} target="_blank" rel="noreferrer">
                  <img src={youtubeIcon} alt="YouTube" width={16} />
                </a>
              )}
              {launch.links?.article && (
                <a href={launch.links.article} target="_blank" rel="noreferrer">
                  <img src={nasaIcon} alt="Article" width={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        <Button onClick={onClose} size="small">
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent dividers className="pt-4 pb-2 px-8">
        {launch.details && (
          <div className="mb-6">
            <Typography sx={{ mb: 1, fontSize: '14px', color: '#374151' }}>
              {launch.details}
              {launch.links?.wikipedia && (
                <>
                  .{' '}
                  <a
                    href={launch.links.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'rgb(30, 34, 138)',
                      textDecoration: 'none',
                      marginLeft: '4px'
                    }}
                  >
                    Wikipedia
                  </a>
                </>
              )}
            </Typography>
          </div>
        )}
        <div className="flex flex-col mt-2 divide-y divide-gray-200">
          {launchDetails.map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row sm:items-start gap-y-1 sm:gap-x-4 py-3"
            >
              <div className="sm:w-1/3">
                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
                  {label}
                </Typography>
              </div>
              <div className="sm:w-2/3">
                <Typography sx={{ fontSize: '14px', color: '#4b5563' }}>
                  {value}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LaunchModal

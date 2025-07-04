import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography
} from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { StatusTag } from './index'
import dayjs from 'dayjs'

const TABLE_COLUMNS = [
  'No:',
  'Launched (UTC)',
  'Location',
  'Mission',
  'Orbit',
  'Launch Status',
  'Rocket'
]

const getPaginationRange = (currentPage, totalPages, siblingCount = 1) => {
  const totalPageNumbers = siblingCount * 2 + 5
  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages)
  const showLeftDots = leftSibling > 2
  const showRightDots = rightSibling < totalPages - 1
  const firstPage = 1
  const lastPage = totalPages

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1)
    return [...leftRange, '...', lastPage]
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i
    )
    return [firstPage, '...', ...rightRange]
  }

  const middleRange = Array.from({ length: 2 * siblingCount + 1 }, (_, i) => leftSibling + i)
  return [firstPage, '...', ...middleRange, '...', lastPage]
}

const LaunchTable = ({ onRowClick, filter = 'all', dateRange }) => {
  const [launches, setLaunches] = useState([])
  const [rocketMap, setRocketMap] = useState({})
  const [padMap, setPadMap] = useState({})
  const [orbitMap, setOrbitMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(10)
  const [latestLaunchId, setLatestLaunchId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [
          latestRes,
          pastRes,
          upcomingRes,
          rocketsRes,
          padsRes,
          payloadsRes
        ] = await Promise.all([
          fetch('https://api.spacexdata.com/v5/launches/latest'),
          fetch('https://api.spacexdata.com/v5/launches/past'),
          fetch('https://api.spacexdata.com/v5/launches/upcoming'),
          fetch('https://api.spacexdata.com/v4/rockets'),
          fetch('https://api.spacexdata.com/v4/launchpads'),
          fetch('https://api.spacexdata.com/v4/payloads')
        ])

        const [
          latestLaunch,
          pastLaunches,
          upcomingLaunches,
          rocketsData,
          padsData,
          payloadsData
        ] = await Promise.all([
          latestRes.json(),
          pastRes.json(),
          upcomingRes.json(),
          rocketsRes.json(),
          padsRes.json(),
          payloadsRes.json()
        ])

        setLatestLaunchId(latestLaunch?.id || null)

        const rocketMap = rocketsData.reduce((acc, r) => {
          acc[r.id] = r.name
          return acc
        }, {})

        const padMap = padsData.reduce((acc, p) => {
          acc[p.id] = p.name
          return acc
        }, {})

        const orbitMap = payloadsData.reduce((acc, p) => {
          acc[p.id] = p.orbit
          return acc
        }, {})

        let selectedLaunches = []

        if (filter === 'latest') {
          selectedLaunches = [latestLaunch]
        } else if (filter === 'past') {
          selectedLaunches = pastLaunches
        } else if (filter === 'upcoming') {
          selectedLaunches = upcomingLaunches
        } else if (filter === 'success') {
          selectedLaunches = pastLaunches.filter((l) => l.success === true)
        } else if (filter === 'failed') {
          selectedLaunches = pastLaunches.filter((l) => l.success === false)
        } else {
          selectedLaunches = [...pastLaunches, latestLaunch, ...upcomingLaunches]
        }

      
        selectedLaunches.sort((a, b) => new Date(a.date_utc) - new Date(b.date_utc))

        setLaunches(selectedLaunches)
        setRocketMap(rocketMap)
        setPadMap(padMap)
        setOrbitMap(orbitMap)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filter])

  const filteredLaunches = launches.filter((launch) => {
    const launchDate = dayjs(launch.date_utc)
    const [start, end] = dateRange || []

    const dateMatch =
      (!start || launchDate.isSame(start, 'day') || launchDate.isAfter(start)) &&
      (!end || launchDate.isSame(end, 'day') || launchDate.isBefore(end))

    return dateMatch
  })

  const totalPages = Math.ceil(filteredLaunches.length / rowsPerPage)
  const paginatedLaunches = filteredLaunches.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const paginationRange = getPaginationRange(page + 1, totalPages)

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) setPage(newPage)
  }

  return (
    <Paper elevation={3} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: 'rgba(244, 245, 247, 1)' }}>
            <TableRow>
              {TABLE_COLUMNS.map((label) => (
                <TableCell key={label} className="text-gray-600 font-inter text-[14px] font-extrabold">
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={TABLE_COLUMNS.length} align="center" sx={{ py: 6 }}>
                  🚀 <Typography variant="body2">Loading launches...</Typography>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={TABLE_COLUMNS.length} align="center" sx={{ py: 6 }}>
                  💥 <Typography color="error">Error: {error}</Typography>
                </TableCell>
              </TableRow>
            ) : paginatedLaunches.length > 0 ? (
              paginatedLaunches.map((launch) => {
                const orbit = orbitMap[launch.payloads?.[0]] || '—'
                const rocket = rocketMap[launch.rocket] || launch.rocket
                const site = padMap[launch.launchpad] || launch.launchpad
                const isLatest = launch.id === latestLaunchId

                return (
                  <TableRow
                    key={launch.id}
                    hover
                    onClick={() => onRowClick?.(launch)}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      filter === 'all' && isLatest ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <TableCell>{launch.flight_number}</TableCell>
                    <TableCell>{dayjs(launch.date_utc).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>{site}</TableCell>
                    <TableCell>
                      {launch.name}
                      {filter === 'all' && isLatest && (
                        <span className="ml-2 text-xs text-blue-600 font-semibold">Latest</span>
                      )}
                    </TableCell>
                    <TableCell>{orbit}</TableCell>
                    <TableCell>
                      <StatusTag
                        status={
                          launch.success
                            ? 'Success'
                            : launch.upcoming
                            ? 'Upcoming'
                            : 'Failed'
                        }
                      />
                    </TableCell>
                    <TableCell>{rocket}</TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={TABLE_COLUMNS.length} align="center" sx={{ py: 6 }}>
                  🛰️ <Typography variant="body2" color="text.secondary">
                    No results found for this filter
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4 px-4 pb-4 flex-wrap">
          <IconButton onClick={() => handlePageChange(page - 1)} disabled={page === 0} size="small">
            <ChevronLeft />
          </IconButton>

          {paginationRange.map((item, index) =>
            item === '...' ? (
              <span key={`ellipsis-${index}`} className="text-gray-500 px-2">…</span>
            ) : (
              <button
                key={item}
                onClick={() => handlePageChange(item - 1)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  page === item - 1
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {item}
              </button>
            )
          )}

          <IconButton
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages - 1}
            size="small"
          >
            <ChevronRight />
          </IconButton>
        </div>
      )}
    </Paper>
  )
}

export default LaunchTable

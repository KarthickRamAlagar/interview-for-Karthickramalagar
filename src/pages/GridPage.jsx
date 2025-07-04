import { useState } from 'react'
import { Container, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {
  LaunchTable,
  LaunchModal,
  TimeFilterBar,
  FilterPanel
} from '../components'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import SpaceXLogo from '../assets/images/SpaceXLogo.png'
import dayjs from 'dayjs'

const theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'].join(',')
  }
})

function App() {
  const [selectedLaunch, setSelectedLaunch] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const [filter, setFilter] = useState('all')
  const [rangeLabel, setRangeLabel] = useState('Past 6 Months')
  const [dateRange, setDateRange] = useState([dayjs().subtract(6, 'month'), dayjs()]) 

  const handleRowClick = (launch) => {
    setSelectedLaunch(launch)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedLaunch(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" className="py-8">

        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <img
            src={SpaceXLogo}
            alt="SpaceX Logo"
            width={260}
            height={32}
            className="object-contain"
          />
        </div>

        {/* FILTERS */}
        <div className="flex justify-between items-center mb-6 gap-1 sm:gap-4 flex-nowrap">
          <TimeFilterBar
            rangeLabel={rangeLabel}
            setRangeLabel={setRangeLabel}
            setDateRange={setDateRange}
            dateRange={dateRange} // pass in if needed by your bar
          />
          <FilterPanel
            filter={filter}
            setFilter={setFilter}
          />
        </div>

        {/* LAUNCH TABLE */}
        <LaunchTable
          onRowClick={handleRowClick}
          filter={filter}
          dateRange={dateRange}
        />

        {/* LAUNCH MODAL */}
        <LaunchModal
          open={openModal}
          onClose={handleCloseModal}
          launch={selectedLaunch}
        />

      </Container>
    </ThemeProvider>
  )
}

export default App

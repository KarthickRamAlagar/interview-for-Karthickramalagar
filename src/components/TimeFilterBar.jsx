import { useEffect, useState } from 'react'
import {
  Button, Stack, Box, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, List, ListItem, ListItemButton, ListItemText
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const PREDEFINED_OPTIONS = [
  { key: 'all', label: 'All Time', range: () => [null, null] },
  { key: 'past_1_month', label: 'Past Month', range: () => [dayjs().subtract(1, 'month'), dayjs()] },
  { key: 'past_3_months', label: 'Past 3 Months', range: () => [dayjs().subtract(3, 'month'), dayjs()] },
  { key: 'past_6_months', label: 'Past 6 Months', range: () => [dayjs().subtract(6, 'month'), dayjs()] },
  { key: 'past_year', label: 'Past Year', range: () => [dayjs().subtract(1, 'year'), dayjs()] },
  { key: 'custom', label: 'Custom Range', range: () => [dayjs().subtract(1, 'month'), dayjs()] }
]

const TimeFilterBar = ({ dateRange, setDateRange, rangeLabel, setRangeLabel }) => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedKey, setSelectedKey] = useState('all')
  const [customRange, setCustomRange] = useState([null, null])

  const handleSelectOption = ({ key, label, range }) => {
    const value = range()
    setSelectedKey(key)
    setRangeLabel(label)
    setDateRange(value)
    if (key === 'custom') setCustomRange(value)
  }

  const handleApplyCustomRange = () => {
    if (customRange[0] && customRange[1]) {
      setDateRange(customRange)
      setRangeLabel(`${customRange[0].format('MMM D, YYYY')} – ${customRange[1].format('MMM D, YYYY')}`)
    }
  }

  const handleClear = () => {
    setSelectedKey('all')
    setRangeLabel('All Time')
    setDateRange([null, null])
    setCustomRange([null, null])
    setOpenModal(false)
  }

  useEffect(() => {
    handleSelectOption(PREDEFINED_OPTIONS[0]) 
  }, [])

  return (
    <>
      <Button
        variant="text"
        onClick={() => setOpenModal(true)}
        sx={{ color: 'rgba(75,85,99,1)', fontWeight: 'bold', textTransform: 'none' }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarMonthIcon sx={{ fontSize: '1.3rem' }} />
          <span className="hidden md:inline text-sm font-medium">{rangeLabel}</span>
        </Stack>
      </Button>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Select Date Range</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
              <List dense sx={{ width: 200 }}>
                {PREDEFINED_OPTIONS.map((opt) => (
                  <ListItem key={opt.key} disablePadding>
                    <ListItemButton
                      selected={selectedKey === opt.key}
                      onClick={() => handleSelectOption(opt)}
                    >
                      <ListItemText primary={opt.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DatePicker
                  label="Start Date"
                  value={customRange[0]}
                  onChange={(date) => setCustomRange([date, customRange[1]])}
                  disabled={selectedKey !== 'custom'}
                  renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                />
                <DatePicker
                  label="End Date"
                  value={customRange[1]}
                  onChange={(date) => setCustomRange([customRange[0], date])}
                  disabled={selectedKey !== 'custom'}
                  renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                />
              </Box>
            </Box>
          </LocalizationProvider>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClear} color="error" variant="outlined">Clear</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={() => setOpenModal(false)} variant="outlined">Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (selectedKey === 'custom') handleApplyCustomRange()
              setOpenModal(false)
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TimeFilterBar

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField
} from '@mui/material'
import { DateRangePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'

const shortcutItems = [
  { key: 'all', label: 'All Time', range: () => [null, null] },
  { key: 'past_week', label: 'Past Week', range: () => [dayjs().subtract(7, 'day'), dayjs()] },
  { key: 'past_month', label: 'Past Month', range: () => [dayjs().subtract(1, 'month'), dayjs()] },
  { key: 'past_3_months', label: 'Past 3 Months', range: () => [dayjs().subtract(3, 'month'), dayjs()] },
  { key: 'past_6_months', label: 'Past 6 Months', range: () => [dayjs().subtract(6, 'month'), dayjs()] },
  { key: 'past_year', label: 'Past Year', range: () => [dayjs().subtract(1, 'year'), dayjs()] },
  { key: 'reset', label: 'Reset', range: () => [null, null] }
]

const DateRangeModal = ({
  open,
  onClose,
  value,
  setValue,
  selectedKey,
  setSelectedKey,
  onSelectPreset,
  onApply
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontSize: '18px',
          color: 'rgba(31,41,55,1)'
        }}
      >
        Select Date Range
      </DialogTitle>

      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexDirection: { xs: 'column', md: 'row' }
            }}
          >
            <List dense sx={{ width: { xs: '100%', md: 200 }, minWidth: 160 }}>
              {shortcutItems.map(({ key, label, range }) => (
                <ListItem key={key} disablePadding>
                  <ListItemButton
                    selected={selectedKey === key}
                    onClick={() => {
                      setSelectedKey(key)
                      onSelectPreset({ key, label, range })
                    }}
                  >
                    <ListItemText primary={label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Box sx={{ flexGrow: 1 }}>
              <DateRangePicker
                value={value}
                onChange={(newValue) => setValue(newValue)}
                disableFuture
                calendars={2}
                renderInput={(startProps, endProps) => (
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TextField {...startProps} fullWidth size="small" />
                    <TextField {...endProps} fullWidth size="small" />
                  </Box>
                )}
              />
            </Box>
          </Box>
        </LocalizationProvider>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onApply()
            onClose()
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DateRangeModal

import { Menu, MenuItem, Button, Stack } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useState } from 'react'

const FilterPanel = ({ filter, setFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const statusOptions = [
    { label: 'All Launches', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Success', value: 'success' },
    { label: 'Failed', value: 'failed' }
  ]

  const currentLabel =
    statusOptions.find(opt => opt.value === filter)?.label || 'Filter'

  const iconColor = 'rgba(75,85,99,1)'

  return (
    <>
      <Button
        variant="text"
        onClick={e => setAnchorEl(e.currentTarget)}
        endIcon={<ArrowDropDownIcon sx={{ color: iconColor, fontSize: '1.5rem' }} />}
        sx={{
          color: iconColor,
          fontWeight: 'bold',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          minWidth: 0
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <FilterListIcon sx={{ color: iconColor, fontSize: '1.3rem' }} />
          {/* Show text only from md screens and up */}
          <span className="hidden md:inline text-sm font-medium">
            {currentLabel}
          </span>
        </Stack>
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {statusOptions.map(({ label, value }) => (
          <MenuItem
            key={value}
            onClick={() => {
              setFilter(value)
              setAnchorEl(null)
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default FilterPanel

import { Chip } from '@mui/material'

const statusStyles = {
  Upcoming: {
    backgroundColor: 'rgba(254,243,199,1)',
    color: 'rgba(146,64,15,1)',
    fontFamily: '"Helvetica Neue", sans-serif',
  },
  Success: {
    backgroundColor: 'rgba(222,247,236,1)',
    color: 'rgba(3,84,63,1)',
    fontFamily: '"Helvetica Neue", sans-serif',
  },
  Failed: {
    backgroundColor: 'rgba(253,226,225,1)',
    color: 'rgba(152,27,28,1)',
    fontFamily: '"Helvetica Neue", sans-serif',
  },
}

const StatusTag = ({ status }) => {
  const style = statusStyles[status] || statusStyles.Upcoming

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        fontFamily: style.fontFamily,
        fontSize: '12px',
        fontWeight: 500,
        height: 24,
        borderRadius: '6px',
        px: 1.5,
      }}
    />
  )
}

export default StatusTag

import { TableRow, TableCell } from '@mui/material'
export default function ErrorRow({ message }) {
  return (
    <TableRow>
      <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
        <span style={{ fontSize: '2rem' }}>💥</span>
        <div style={{ fontStyle: 'italic', color: '#b91c1c' }}>
          Oops! Something went wrong 😵‍💫
        </div>
        <div style={{ color: '#ef4444' }}>{message}</div>
      </TableCell>
    </TableRow>
  )
}

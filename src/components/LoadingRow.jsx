import { TableRow, TableCell } from '@mui/material'
export default function LoadingRow() {
  return (
    <TableRow>
      <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🚀</div>
        <div style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#6b7280' }}>
          Loading launches... please wait <span style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>☕</span>
        </div>
      </TableCell>
    </TableRow>
  )
}



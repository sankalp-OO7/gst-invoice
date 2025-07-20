import React from "react";
import {
  Box, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Paper,
  Divider
} from "@mui/material";
import { Bill } from "type/bill";

interface Props {
  bill: Bill;
}

export const BillTemplate: React.FC<Props> = ({ bill }) => {
  return (
    <Paper sx={{ maxWidth: 800, mx: "auto", p: 4, mt: 4, position: "relative" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        INVOICE
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Typography fontWeight="bold">Date Issued:</Typography>
          <Typography>{bill?.date}</Typography>
          <Typography fontWeight="bold" sx={{ mt: 2 }}>Invoice No:</Typography>
          <Typography>{bill?.id.slice(0, 5).toUpperCase()}</Typography>
        </Box>
        <Box textAlign="right">
          <Typography fontWeight="bold">Issued to:</Typography>
          <Typography>{bill?.customerName}</Typography>
          <Typography>123 Anywhere St., Any City,</Typography>
          <Typography>ST 12345</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell><strong>NO</strong></TableCell>
            <TableCell><strong>DESCRIPTION</strong></TableCell>
            <TableCell><strong>QTY</strong></TableCell>
            <TableCell><strong>PRICE</strong></TableCell>
            <TableCell><strong>SUBTOTAL</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bill?.items.map((item, index) => (
            <TableRow key={item.itemId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>${item.total}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="right" sx={{ fontWeight: "bold" }}>
              GRAND TOTAL
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              ${bill?.totalAmount}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Note & Signature */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Box>
          <Typography fontWeight="bold">Note:</Typography>
          <Typography>Bank Name: Rimberio</Typography>
          <Typography>Account No: 0123 4567 8901</Typography>
        </Box>
        <Box textAlign="right">
          <Typography sx={{ fontFamily: "'Brush Script MT', cursive", fontSize: "1.5rem" }}>
            Claudia
          </Typography>
          <Typography variant="body2">Finance Manager</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

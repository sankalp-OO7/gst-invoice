import React, { useState } from "react";
import {
  Box, Button, TextField, Typography, Paper, InputAdornment,
  Dialog,
} from "@mui/material";


import { v4 as uuidv4 } from "uuid";
// Update the import path below to the correct relative path to your bill types file
import { availableItems, Bill, BillItem } from "../type/bill";
import { BillTemplate } from "./BillTemplate";

export const BillForm: React.FC = () => {
  const [customerName, setCustomerName] = useState("");
  const [selectedItems, setSelectedItems] = useState<BillItem[]>([]);
  const [bill, setBill] = useState<Bill | null>(null);

  const handleQuantityChange = (itemId: string, quantity: number) => {
    const item = availableItems.find(i => i.id === itemId);
    if (!item || quantity <= 0) return;

    const total = quantity * item.price;
    const billItem: BillItem = {
      itemId,
      name: item.name,
      quantity,
      price: item.price,
      total,
    };

    setSelectedItems(prev => {
      const existing = prev.find(p => p.itemId === itemId);
      if (existing) {
        return prev.map(p => p.itemId === itemId ? billItem : p);
      }
      return [...prev, billItem];
    });
  };

  const generateBill = () => {
    const totalAmount = selectedItems.reduce((sum, i) => sum + i.total, 0);
    const newBill: Bill = {
      id: uuidv4(),
      date: new Date().toLocaleDateString(),
      customerName,
      items: selectedItems,
      totalAmount,
    };
    setBill(newBill);
  };

  return (
    <>
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <Typography variant="h5" gutterBottom>Generate Asset Bill</Typography>

        <TextField
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Paper sx={{ p: 2, mt: 2 }} variant="outlined">
          <Typography variant="subtitle1">Select Items</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            {availableItems.map(item => (
              <React.Fragment key={item.id}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography>{item.name} - ₹{item.price}</Typography>
                  <TextField
                    type="number"
                    label="Quantity"
                    size="small"
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end">Qty</InputAdornment>
                      }
                    }}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    fullWidth
                  />
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={generateBill}
          disabled={!customerName || selectedItems.length === 0}
        >
          Generate Bill
        </Button>
      </Box>

      {/* Popup Dialog for Bill */}
      <Dialog open={!!bill} onClose={() => setBill(null)} maxWidth="md" fullWidth>
        <Box sx={{ p: 3 }}>
          <BillTemplate bill={bill as Bill} />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setBill(null)} variant="outlined">Close</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

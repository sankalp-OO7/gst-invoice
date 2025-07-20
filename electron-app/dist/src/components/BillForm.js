import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, InputAdornment, } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
// Update the import path below to the correct relative path to your bill types file
import { availableItems } from "../type/bill";
import { BillTemplate } from "./BillTemplate";
export const BillForm = () => {
    const [customerName, setCustomerName] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [bill, setBill] = useState(null);
    const handleQuantityChange = (itemId, quantity) => {
        const item = availableItems.find(i => i.id === itemId);
        if (!item || quantity <= 0)
            return;
        const total = quantity * item.price;
        const billItem = {
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
        const newBill = {
            id: uuidv4(),
            date: new Date().toLocaleDateString(),
            customerName,
            items: selectedItems,
            totalAmount,
        };
        setBill(newBill);
    };
    return (_jsxs(Box, { sx: { maxWidth: 800, mx: "auto", p: 3 }, children: [_jsx(Typography, { variant: "h5", gutterBottom: true, children: "Generate Asset Bill" }), _jsx(TextField, { label: "Customer Name", value: customerName, onChange: (e) => setCustomerName(e.target.value), fullWidth: true, margin: "normal" }), _jsxs(Paper, { sx: { p: 2, mt: 2 }, variant: "outlined", children: [_jsx(Typography, { variant: "subtitle1", children: "Select Items" }), _jsx(Box, { sx: { display: "flex", flexDirection: "column", gap: 2, mt: 1 }, children: availableItems.map(item => (_jsx(React.Fragment, { children: _jsxs(Box, { sx: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [_jsxs(Typography, { children: [item.name, " - \u20B9", item.price] }), _jsx(TextField, { type: "number", label: "Quantity", size: "small", slotProps: {
                                            input: {
                                                endAdornment: _jsx(InputAdornment, { position: "end", children: "Qty" })
                                            }
                                        }, onChange: (e) => handleQuantityChange(item.id, Number(e.target.value)), fullWidth: true })] }) }, item.id))) })] }), _jsx(Button, { variant: "contained", color: "primary", sx: { mt: 3 }, onClick: generateBill, disabled: !customerName || selectedItems.length === 0, children: "Generate Bill" }), bill && (_jsx(Box, { sx: { mt: 4 }, children: _jsx(BillTemplate, { bill: bill }) }))] }));
};

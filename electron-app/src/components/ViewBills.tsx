import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    Dialog,
    Button,
} from '@mui/material';
import { Bill } from 'type/bill';
import { BillTemplate } from './BillTemplate';

// const data = [
//     { id: "1", name: "Laptop", customer: "John Doe", price: 40000 },
//     { id: "2", name: "Printer", customer: "Jane Smith", price: 8000 },
//     { id: "3", name: "Monitor", customer: "Alice Johnson", price: 12000 },
// ];

export const bills: Bill[] = [
    {
        id: 'inv123456789',
        date: '06-07-2025', // DD-MM-YYYY
        customerName: 'Rahul Sharma',
        items: [
            { itemId: '1', name: 'Lenovo Laptop', quantity: 1, price: 55000, total: 55000 },
            { itemId: '2', name: 'Wireless Mouse', quantity: 2, price: 700, total: 1400 },
        ],
        totalAmount: 56400,
    },
    {
        id: 'inv987654321',
        date: '20-06-2025',
        customerName: 'Priya Verma',
        items: [
            { itemId: '3', name: 'LED Monitor', quantity: 1, price: 15000, total: 15000 },
            { itemId: '4', name: 'USB Cable', quantity: 3, price: 200, total: 600 },
        ],
        totalAmount: 15600,
    },
    {
        id: 'inv111222333',
        date: '15-05-2025',
        customerName: 'Amitabh Joshi',
        items: [
            { itemId: '5', name: 'Office Table', quantity: 1, price: 8500, total: 8500 },
        ],
        totalAmount: 8500,
    },
];


const ViewBills: React.FC = () => {
    const [bill, setBill] = useState<Bill | null>(null);
    const handleViewBill = (bill: Bill) => {
        setBill(bill);
    };
    return (
        <>
            <Box sx={{ maxWidth: 1500, mx: 'auto', mt: 5 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    All Bills
                </Typography>
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell><strong>Sr No</strong></TableCell>
                                <TableCell><strong>Invoice No</strong></TableCell>
                                <TableCell><strong>Date</strong></TableCell>
                                <TableCell><strong>Customer</strong></TableCell>
                                <TableCell><strong>Items</strong></TableCell>
                                <TableCell><strong>Total Amount ($)</strong></TableCell>
                                <TableCell><strong>Action</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bills.map((bill, index) => (
                                <TableRow key={bill.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{bill.id.slice(0, 5).toUpperCase()}</TableCell>
                                    <TableCell>{bill.date}</TableCell>
                                    <TableCell>{bill.customerName}</TableCell>
                                    <TableCell>{bill.items.length}</TableCell>
                                    <TableCell>{bill.totalAmount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleViewBill(bill)}>View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Dialog open={!!bill} onClose={() => setBill(null)} maxWidth="md" fullWidth>
                <Box sx={{ p: 3 }}>
                    <BillTemplate bill={bill as Bill} />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button onClick={() => setBill(null)} variant="outlined">Close</Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default ViewBills

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
    IconButton,
    PaperProps // Import PaperProps
} from '@mui/material';
import { Bill } from 'type/bill';
import { BillTemplate } from './BillTemplate';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Eye, XCircle, Printer } from 'lucide-react';

// Sample Bill data (moved here for self-containment if 'type/bill' isn't available)
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

// Framer Motion Variants for table rows
const rowVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: {
        scale: 1.02,
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.12)', // Slightly more pronounced shadow on hover
        transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: { scale: 0.98 },
};

// Framer Motion Variants for dialog
const dialogVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.5 }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: 50,
        transition: { duration: 0.3, ease: "easeIn" }
    }
};

// Define MotionPaper component outside to avoid re-creation and help TypeScript
// Cast motion(Paper) to React.ComponentType<PaperProps> to satisfy Dialog's PaperComponent prop type
const MotionPaper = motion(Paper) as React.ComponentType<PaperProps>;

const ViewBills: React.FC = () => {
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

    const handleViewBill = (billData: Bill) => {
        setSelectedBill(billData);
    };

    const handleCloseDialog = () => {
        setSelectedBill(null);
    };

    return (
        <Box
            sx={{
                maxWidth: 1500,
                mx: 'auto',
                mt: 5,
                p: { xs: 2, md: 4 },
                backgroundColor: '#F7F9FC',
                borderRadius: '16px',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
        >
            <Typography
                variant="h4"
                fontWeight={700}
                gutterBottom
                sx={{
                    color: '#004080',
                    textAlign: 'center',
                    mb: 5, // Increased margin below title for more separation
                    textShadow: '1px 1px 2px rgba(0,0,0,0.05)',
                }}
            >
                Overview of All Bills
            </Typography>

            <TableContainer
                component={Paper}
                elevation={8} // Increased elevation for a more substantial look
                sx={{
                    borderRadius: '16px', // More rounded corners for the table container
                    overflow: 'hidden',
                    border: '1px solid #D0D0D0', // Slightly darker border for definition
                }}
            >
                <Table stickyHeader aria-label="bills table">
                    <TableHead
                        sx={{
                            backgroundColor: '#ADD8E6',
                            '& .MuiTableCell-head': { // Target header cells
                                color: '#004080',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                padding: '20px 28px', // Increased padding for header cells
                                // Ensure text is centered in headers where appropriate, or left-aligned by default
                                '&:nth-of-type(1)': { textAlign: 'left' }, // Sr No
                                '&:nth-of-type(2)': { textAlign: 'left' }, // Invoice No
                                '&:nth-of-type(3)': { textAlign: 'left' }, // Date
                                '&:nth-of-type(4)': { textAlign: 'left' }, // Customer
                                '&:nth-of-type(5)': { textAlign: 'center' }, // Items Count
                                '&:nth-of-type(6)': { textAlign: 'right' }, // Total Amount
                                '&:nth-of-type(7)': { textAlign: 'center' }, // Action
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell><strong>Sr No</strong></TableCell>
                            <TableCell><strong>Invoice No</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Customer</strong></TableCell>
                            <TableCell><strong>Items Count</strong></TableCell>
                            <TableCell><strong>Total Amount (₹)</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bills.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4, color: '#666' }}>
                                    No bills available.
                                </TableCell>
                            </TableRow>
                        ) : (
                            bills.map((bill, index) => (
                                <motion.tr
                                    key={bill.id}
                                    variants={rowVariants}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="hover"
                                    whileTap="tap"
                                    style={{
                                        backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FDFDFD',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <TableCell sx={{ padding: '18px 28px', borderBottom: index === bills.length - 1 ? 'none' : undefined }}>{index + 1}</TableCell>
                                    <TableCell sx={{ padding: '18px 28px', fontWeight: 500, color: '#333', borderBottom: index === bills.length - 1 ? 'none' : undefined }}>
                                        {bill.id.slice(0, 5).toUpperCase()}...
                                    </TableCell>
                                    <TableCell sx={{ padding: '18px 28px', borderBottom: index === bills.length - 1 ? 'none' : undefined }}>{bill.date}</TableCell>
                                    <TableCell sx={{ padding: '18px 28px', color: '#555', borderBottom: index === bills.length - 1 ? 'none' : undefined }}>{bill.customerName}</TableCell>
                                    <TableCell align="center" sx={{ padding: '18px 28px', borderBottom: index === bills.length - 1 ? 'none' : undefined }}>{bill.items.length}</TableCell>
                                    <TableCell align="right" sx={{ padding: '18px 28px', fontWeight: 600, color: '#007BFF', borderBottom: index === bills.length - 1 ? 'none' : undefined }}>
                                    ₹  {bill.totalAmount.toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '18px 28px', borderBottom: index === bills.length - 1 ? 'none' : undefined }}>
                                        <motion.div whileTap={{ scale: 0.9 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="medium" // Slightly larger button
                                                startIcon={<Eye size={18} />}
                                                onClick={() => handleViewBill(bill)}
                                                sx={{
                                                    borderRadius: '10px', // More rounded button
                                                    textTransform: 'none',
                                                    boxShadow: '0px 3px 10px rgba(0, 123, 255, 0.25)', // Enhanced shadow
                                                    '&:hover': {
                                                        boxShadow: '0px 6px 15px rgba(0, 123, 255, 0.35)', // Even larger shadow on hover
                                                        backgroundColor: '#0069D9',
                                                    },
                                                    minWidth: '120px', // Ensure consistent button width
                                                }}
                                            >
                                                View Details
                                            </Button>
                                        </motion.div>
                                    </TableCell>
                                </motion.tr>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <AnimatePresence>
                {selectedBill && (
                    <Dialog
                        open={!!selectedBill}
                        onClose={handleCloseDialog}
                        maxWidth="md"
                        fullWidth
                        PaperComponent={MotionPaper}
                        PaperProps={{
                            variants: dialogVariants,
                            initial: "hidden",
                            animate: "visible",
                            exit: "exit",
                            sx: { borderRadius: '16px', overflow: 'hidden' }
                        }}
                    >
                        <Box sx={{ p: { xs: 2, md: 4 }, position: 'relative' }}>
                            <IconButton
                                onClick={handleCloseDialog}
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    color: '#666',
                                    '&:hover': { color: '#333', backgroundColor: 'rgba(0,0,0,0.05)' },
                                }}
                            >
                                <XCircle size={24} />
                            </IconButton>
                            <Typography variant="h5" fontWeight={700} sx={{ mb: 3, color: '#004080', textAlign: 'center' }}>
                                Bill Details
                            </Typography>
                            <BillTemplate bill={selectedBill as Bill} />
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<Printer size={20} />}
                                    onClick={() => window.print()}
                                    sx={{ borderRadius: '8px', textTransform: 'none' }}
                                >
                                    Print Bill
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCloseDialog}
                                    sx={{ borderRadius: '8px', textTransform: 'none' }}
                                >
                                    Close
                                </Button>
                            </Box>
                        </Box>
                    </Dialog>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default ViewBills;

import React, { useState } from "react";
import {
  Box, Button, TextField, Typography, Paper, InputAdornment,
  Dialog, IconButton, // Import IconButton for close button
} from "@mui/material";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Import Framer Motion components
import { FilePlus, XCircle, Printer } from "lucide-react"; // Icons for Generate, Close, Print
import { v4 as uuidv4 } from "uuid";

// Assuming these types and availableItems are defined in ../type/bill
// If not, you might need to define them here for the component to compile.
import { availableItems, Bill, BillItem } from "../type/bill";
import { BillTemplate } from "./BillTemplate"; // Assuming BillTemplate is in the same directory

// Framer Motion Variants for the main container
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.2 }
  },
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

// Define MotionPaper component for Dialog animation
const MotionPaper = motion(Paper) as React.ComponentType<any>; // Using 'any' to simplify type casting for now

export const BillForm: React.FC = () => {
  const [customerName, setCustomerName] = useState("");
  const [selectedItems, setSelectedItems] = useState<BillItem[]>([]);
  const [bill, setBill] = useState<Bill | null>(null);

  // State to track quantities for each item, initialized to 0
  const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({});

  // Initialize itemQuantities state on component mount
  React.useEffect(() => {
    const initialQuantities: { [key: string]: number } = {};
    availableItems.forEach(item => {
      initialQuantities[item.id] = 0;
    });
    setItemQuantities(initialQuantities);
  }, []); // Run only once on mount

  const handleQuantityChange = (itemId: string, quantityInput: string) => {
    const quantity = Number(quantityInput);
    setItemQuantities(prev => ({ ...prev, [itemId]: quantity }));

    const item = availableItems.find(i => i.id === itemId);
    if (!item) return;

    if (quantity <= 0 || isNaN(quantity)) {
      // Remove item if quantity is 0 or invalid
      setSelectedItems(prev => prev.filter(p => p.itemId !== itemId));
    } else {
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
    }
  };

  const generateBill = () => {
    const totalAmount = selectedItems.reduce((sum, i) => sum + i.total, 0);
    const newBill: Bill = {
      id: uuidv4(),
      date: new Date().toLocaleDateString('en-GB'), // Format date as DD/MM/YYYY
      customerName,
      items: selectedItems,
      totalAmount,
    };
    setBill(newBill);
  };

  const isGenerateButtonDisabled = !customerName.trim() || selectedItems.length === 0;

  return (
    <Box
      sx={{
        maxWidth: 900, // Increased max width for a more spacious form
        mx: "auto",
        mt: 5,
        p: { xs: 2, md: 4 }, // Responsive padding
        backgroundColor: '#F7F9FC', // Light background for the form area
        borderRadius: '16px', // Rounded corners
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)', // Subtle shadow
      }}
      component={motion.div} // Animate the main content box
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Typography
        variant="h4" // Larger, more prominent title
        fontWeight={700} // Bolder title
        gutterBottom
        sx={{
          color: '#004080', // Deep blue color for title
          textAlign: 'center', // Center align title
          mb: 4, // More margin below title
          textShadow: '1px 1px 2px rgba(0,0,0,0.05)', // Subtle text shadow
        }}
      >
        Generate New Asset Bill
      </Typography>

      <TextField
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined" // Outlined variant for a cleaner look
        sx={{
          mb: 3, // More margin below customer name field
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px', // Rounded input field
            '&.Mui-focused fieldset': {
              borderColor: '#007BFF', // Highlight border on focus
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#007BFF', // Highlight label on focus
          },
        }}
      />

      <Paper
        elevation={4} // Higher elevation for item selection section
        sx={{
          p: { xs: 2, md: 3 }, // Responsive padding
          mt: 2,
          borderRadius: '12px', // Rounded corners for paper
          border: '1px solid #E0E0E0', // Light border
          backgroundColor: '#FFFFFF', // White background
        }}
      >
        <Typography
          variant="h6" // Slightly larger subtitle
          fontWeight={600}
          sx={{ color: '#004080', mb: 2 }} // Deep blue color for subtitle
        >
          Select Items
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {availableItems.map(item => (
            <motion.div
                key={item.id}
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(135, 206, 235, 0.05)' }} // Subtle hover effect
                transition={{ duration: 0.2 }}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: '10px 15px', // Padding for each item row
                    borderRadius: '8px', // Rounded corners for item rows
                    border: '1px solid #F0F0F0', // Light border for item rows
                    backgroundColor: '#FFFFFF', // Ensure white background
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#333' }}>
                    {item.name} - <span style={{ color: '#007BFF', fontWeight: 600 }}>₹{item.price.toLocaleString()}</span>
                </Typography>
                <TextField
                    type="number"
                    label="Quantity"
                    size="small"
                    value={itemQuantities[item.id] || ''} // Controlled component
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Qty</InputAdornment>,
                        inputProps: { min: 0 } // Ensure quantity is not negative
                    }}
                    sx={{
                        width: '120px', // Fixed width for quantity input
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            '&.Mui-focused fieldset': {
                                borderColor: '#007BFF',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#007BFF',
                        },
                    }}
                />
            </motion.div>
          ))}
        </Box>
      </Paper>

      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 4, // More margin above button
            width: '100%', // Full width button
            py: 1.5, // Increased vertical padding
            fontSize: '1.1rem', // Larger font size
            borderRadius: '10px', // More rounded button
            boxShadow: '0px 4px 15px rgba(0, 123, 255, 0.2)', // Enhanced shadow
            textTransform: 'none', // Keep text as is
            '&:hover': {
                boxShadow: '0px 6px 20px rgba(0, 123, 255, 0.3)', // Even larger shadow on hover
                backgroundColor: '#0069D9', // Slightly darker blue on hover
            },
            '&.Mui-disabled': { // Styling for disabled state
                backgroundColor: '#B0C4DE', // Lighter blue when disabled
                color: '#FFFFFF',
                boxShadow: 'none',
            }
          }}
          onClick={generateBill}
          disabled={isGenerateButtonDisabled}
          startIcon={<FilePlus size={24} />} // Icon for generate button
        >
          Generate Bill
        </Button>
      </motion.div>

      {/* Popup Dialog for Bill */}
      <AnimatePresence>
        {bill && (
          <Dialog
            open={!!bill}
            onClose={() => setBill(null)}
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
                onClick={() => setBill(null)}
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
                Generated Bill
              </Typography>
              <BillTemplate bill={bill as Bill} />
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
                    onClick={() => setBill(null)}
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

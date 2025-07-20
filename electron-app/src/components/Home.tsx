import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion'; // Import Variants type
import { FileText, Eye } from 'lucide-react'; // Importing icons from lucide-react

const Home: React.FC = () => {
    const navigate = useNavigate();

    // Define card data for easy mapping and consistency
    const cards = [
        {
            title: 'Generate Bills',
            path: '/generate-bills',
            icon: FileText, // Lucide icon component for generating bills
            description: 'Effortlessly create and manage new invoices for your assets.',
        },
        {
            title: 'View Bills',
            path: '/view-bills',
            icon: Eye, // Lucide icon component for viewing bills
            description: 'Access and review all your past and current billing records.',
        },
    ];

    // Framer Motion animation variants for the cards
    // Explicitly type cardVariants as Variants to help TypeScript
    const cardVariants: Variants = {
        // Initial state of the card (hidden below and transparent)
        hidden: { opacity: 0, y: 50 },
        // Animation to bring the card into view
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring", // Use a spring animation for a natural bounce
                stiffness: 100, // Controls the stiffness of the spring
                damping: 10,    // Controls the oscillation
                duration: 0.8,  // Overall duration of the animation
            }
        },
        // Animation when hovering over the card
        hover: {
            scale: 1.07, // Card scales up slightly
            y: -15,      // Card lifts up
            boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.25)', // Stronger, more diffused shadow for depth
            rotateX: 7,  // Subtle 3D tilt along the X-axis
            backgroundColor: 'rgba(255, 255, 255, 0.95)', // Card background becomes slightly opaque white
            transition: {
                type: "spring", // Spring transition for hover effects too
                stiffness: 300,
                damping: 15,
            },
        },
        // Animation when tapping/clicking the card
        tap: { scale: 0.95 }, // Card scales down slightly to give a press effect
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on small screens, row on medium+
                justifyContent: 'center',
                alignItems: 'center',
                gap: '3rem', // Increased gap between cards for better visual separation
                 // Calculate minHeight to ensure cards are centered vertically on larger screens
                minHeight: 'calc(100vh - 80px - 5rem)', // 100vh - navbar height (80px) - top margin (5rem)
                padding: '2rem', // Add overall padding for responsiveness and breathing room
            }}
        >
            {cards.map((card, index) => (
                <motion.div
                    key={card.path}
                    variants={cardVariants} // Apply the defined animation variants
                    initial="hidden"      // Start from the 'hidden' state
                    animate="visible"     // Animate to the 'visible' state on mount
                    whileHover="hover"    // Apply 'hover' animations on hover
                    whileTap="tap"        // Apply 'tap' animations on click
                    viewport={{ once: true }} // Ensures the 'visible' animation runs only once when it enters the viewport
                    transition={{ delay: index * 0.1 }} // Stagger the animation for each card
                    style={{ perspective: '1000px' }} // Essential for enabling 3D transformations (rotateX)
                >
                    <Card
                        sx={{
                            minWidth: { xs: '90%', sm: 350, md: 400 }, // Responsive width: 90% on extra small, 350px on small, 400px on medium+
                            minHeight: 250, // Increased minimum height for a more substantial card feel
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem', // Base font size for the card content
                            cursor: 'pointer', // Indicates interactivity
                            borderRadius: '16px', // More rounded corners for a softer, modern look
                            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', // Default subtle shadow for depth
                            // Smooth transitions for properties not handled by Framer Motion (e.g., background color, border)
                            transition: 'box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out, border 0.3s ease-in-out',
                            backgroundColor: '#FFFFFF', // Clean white background for the cards
                            border: '1px solid #E0E0E0', // Subtle light grey border for definition
                            padding: '1.5rem', // Inner padding for content
                        }}
                        onClick={() => navigate(card.path)} // Use useNavigate for routing
                    >
                        <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                            {/* Icon Component */}
                            <card.icon
                                size={64} // Large icon size
                                color="#007BFF" // Vibrant blue color for icons, complementing the sky blue navbar
                                style={{ marginBottom: '1.5rem', transition: 'transform 0.3s ease-in-out' }} // Icon spacing and transition
                            />
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{
                                    fontWeight: 700, // Bold title
                                    color: '#333', // Dark grey text for excellent contrast
                                    marginBottom: '0.8rem', // Spacing below title
                                }}
                            >
                                {card.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#666', // Slightly lighter grey for description
                                    maxWidth: '300px', // Constrain description width for readability
                                    lineHeight: 1.6, // Improve line spacing for readability
                                }}
                            >
                                {card.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </Box>
    );
};

export default Home;

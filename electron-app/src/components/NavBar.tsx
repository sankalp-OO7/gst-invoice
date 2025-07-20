import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';

// DeepSeek inspired color palette
const colors = {
  primary: '#1a237e',       // Deep indigo
  secondary: '#4a148c',     // Deep purple
  accent: '#00b0ff',        // Bright blue
  light: '#e8eaf6',         // Light indigo
  text: '#ffffff',          // White text
  activeText: '#00e5ff',    // Cyan accent for active items
};

// Custom styled Button with DeepSeek theme
const NavButton = styled(Button)(({ theme }) => ({
  color: colors.text,
  fontSize: '1.1rem',
  padding: '12px 24px',
  borderRadius: '8px',
  margin: '0 8px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: colors.accent,
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: 'transform 0.4s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 176, 255, 0.1)',
    '&::before': {
      transform: 'scaleX(1)',
      transformOrigin: 'left',
    },
  },
  '&.active': {
    color: colors.activeText,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 176, 255, 0.2)',
    '&::before': {
      transform: 'scaleX(1)',
      backgroundColor: colors.activeText,
    },
  },
}));

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    setActiveLink(path);
    navigate(path);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Generate Bills', path: '/generate-bills' },
    { name: 'View Bills', path: '/view-bills' },
    { name: 'Sync Data', path: '/sync-data' },
  ];

  return (
    <AppBar 
      position="fixed"
      sx={{
        background: scrolled 
          ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
          : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 70%)`,
        boxShadow: scrolled ? '0px 8px 25px rgba(0, 0, 0, 0.3)' : '0px 4px 15px rgba(0, 0, 0, 0.2)',
        height: '80px',
        justifyContent: 'center',
        transition: 'all 0.4s ease-out',
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${colors.accent}`,
      }}
    >
      <Toolbar sx={{ height: '100%', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <Typography
          variant="h4"
          component={motion.div}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            flexGrow: 1,
            color: colors.text,
            fontWeight: 700,
            letterSpacing: '1px',
            background: `linear-gradient(to right, ${colors.text}, ${colors.accent})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <motion.span 
            style={{ marginRight: '10px' }}
            animate={{ rotate: [0, 15, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            🚀
          </motion.span>
          Asset Management
        </Typography>
        
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          alignItems: 'center', 
          height: '100%',
        }}>
          <AnimatePresence>
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
                style={{ display: 'inline-flex' }}
              >
                <NavButton
                  className={activeLink === item.path ? 'active' : ''}
                  onClick={() => handleNavigation(item.path)}
                  disableRipple
                >
                  {item.name}
                  {activeLink === item.path && (
                    <motion.span
                      layoutId="navActiveIndicator"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '8px',
                        height: '8px',
                        backgroundColor: colors.activeText,
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </NavButton>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
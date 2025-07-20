import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { BillForm } from './components/BillForm'; // Assuming BillForm exists
import ViewBills from './components/ViewBills';
import { Box } from '@mui/material'; // Import Box for layout

// You can define a constant for the navbar height if it's fixed
const NAVBAR_HEIGHT = '80px'; // Matches the height set in NavBar.tsx

const GenerateBills: React.FC = () => (
  <Box sx={{ p: 4 }}> {/* Add some padding for content */}
    <h2 style={{ color: '#004080' }}>Generate Bills Page</h2>
    <p style={{ color: '#666' }}>This is where you would add your bill generation form.</p>
  </Box>
);

const App: React.FC = () => {
  return (
    <Router>
      {/* NavBar is positioned at the top */}
      <NavBar />

      {/* Main content area, pushed down by the navbar's height */}
      <Box
        component="main" // Semantic HTML tag for main content
      sx={{
        pt: NAVBAR_HEIGHT, // Padding top to account for the navbar height
      }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate-bills" element={<BillForm />} /> {/* Using the actual BillForm component */}
          <Route path="/view-bills" element={<ViewBills />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;

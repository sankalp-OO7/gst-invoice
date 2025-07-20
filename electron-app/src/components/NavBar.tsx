import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Asset Management
                </Typography>
                <Box>
                    <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                    <Button color="inherit" onClick={() => navigate('/generate-bills')}>Generate Bills</Button>
                    <Button color="inherit" onClick={() => navigate('/view-bills')}>View Bills</Button>
                    <Button color="inherit" onClick={() => navigate('/sync-data')}>Sync Data</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
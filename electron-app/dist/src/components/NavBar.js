import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
    const navigate = useNavigate();
    return (_jsx(AppBar, { position: "static", children: _jsxs(Toolbar, { children: [_jsx(Typography, { variant: "h6", sx: { flexGrow: 1 }, children: "Asset Management" }), _jsxs(Box, { children: [_jsx(Button, { color: "inherit", onClick: () => navigate('/'), children: "Home" }), _jsx(Button, { color: "inherit", onClick: () => navigate('/generate-bills'), children: "Generate Bills" }), _jsx(Button, { color: "inherit", onClick: () => navigate('/view-bills'), children: "View Bills" }), _jsx(Button, { color: "inherit", onClick: () => navigate('/sync-data'), children: "Sync Data" })] })] }) }));
};
export default NavBar;

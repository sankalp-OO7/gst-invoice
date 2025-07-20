import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardContent, Typography } from '@mui/material';
const Home = () => {
    return (_jsx(_Fragment, { children: _jsxs("div", { style: { display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }, children: [_jsx(Card, { sx: { minWidth: 300, minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', cursor: 'pointer' }, onClick: () => window.location.href = '/generate-bills', children: _jsx(CardContent, { children: _jsx(Typography, { variant: "h4", component: "div", align: "center", children: "Generate Bills" }) }) }), _jsx(Card, { sx: { minWidth: 300, minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', cursor: 'pointer' }, onClick: () => window.location.href = '/view-bills', children: _jsx(CardContent, { children: _jsx(Typography, { variant: "h4", component: "div", align: "center", children: "View Bills" }) }) })] }) }));
};
export default Home;

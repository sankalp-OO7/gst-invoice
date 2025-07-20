import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { BillForm } from './components/BillForm';
const GenerateBills = () => (_jsx("div", { children: _jsx("h2", { children: "Generate Bills" }) }));
const ViewBills = () => (_jsx("div", { children: _jsx("h2", { children: "View Bills" }) }));
const App = () => {
    return (_jsxs(Router, { children: [_jsx("div", { children: _jsx(NavBar, {}) }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/generate-bills", element: _jsx(BillForm, {}) }), _jsx(Route, { path: "/view-bills", element: _jsx(ViewBills, {}) })] })] }));
};
export default App;

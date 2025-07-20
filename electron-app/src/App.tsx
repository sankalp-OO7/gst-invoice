import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { BillForm } from './components/BillForm';
import ViewBills from './components/ViewBills';

const GenerateBills: React.FC = () => (
  <div>
    <h2>Generate Bills</h2>
  </div>
);

// const ViewBills: React.FC = () => (
//   <div>
//     <h2>View Bills</h2>
//   </div>
// );

const App: React.FC = () => {
  return (
    <Router>
      <div><NavBar /></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate-bills" element={<BillForm />} />
        <Route path="/view-bills" element={<ViewBills />} />
      </Routes>
    </Router>
  );
};

export default App;

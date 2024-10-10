import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router
import './App.css';
import Header from './components/Header'; // Header component
import Dashboard from './components/Dashboard'; // Dashboard component
import EmployeeForm from './components/EmployeeForm'; // Employee Form component

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />

                {/* Define Routes for different components */}
                <Routes>
                    {/* Dashboard route */}
                    <Route path="/" element={<Dashboard />} />
                    {/* Employee Form route */}
                    <Route path="/employees" element={<EmployeeForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

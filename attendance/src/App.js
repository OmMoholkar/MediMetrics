import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'; // Header component
import EmployeeForm from './components/EmployeeForm'; // Employee Form component
import Dashboard from './components/Dashboard'; // Dashboard component

const App = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard'); // State to track active view

    // Function to handle sidebar menu clicks
    const handleMenuClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className="App">
            <Header />

            {/* Pass handleMenuClick to the Dashboard so it can control the sidebar */}
            <Dashboard onMenuClick={handleMenuClick} />

            {/* Conditional rendering based on the activeComponent state */}
            {activeComponent === 'dashboard' && <div>Dashboard Content Here</div>}
            {activeComponent === 'employeeForm' && <EmployeeForm />}
        </div>
    );
};

export default App;

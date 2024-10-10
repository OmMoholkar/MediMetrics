import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Dashboard.css';

const Dashboard = () => {
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        // Fetch employee count from the PHP backend
        axios.get('http://localhost/MediMetrics/website/getEmployeeCount.php') // Make sure the URL is correct
            .then(response => {
                setEmployeeCount(response.data.count);
            })
            .catch(error => {
                console.error('There was an error fetching the employee count!', error);
            });
    }, []);

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="logo">GEOMR</div>
                <ul>
                    <li className="active">
                        <Link to="/">
                            <i className="fas fa-home"></i> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/employees">
                            <i className="fas fa-user"></i> Employees
                        </Link>
                    </li>
                    <li>
                        <i className="fas fa-user-md"></i> Doctors
                    </li>
                    <li>
                        <i className="fas fa-clipboard"></i> Daily Reports
                    </li>
                    <li>
                        <i className="fas fa-history"></i> Previous Records
                    </li>
                    <li>
                        <i className="fas fa-sign-out-alt"></i> Log Out
                    </li>
                </ul>
            </div>

            {/* Main Dashboard Section */}
            <div className="main-content">
                <header>
                    <h2>DASHBOARD</h2>
                </header>

                {/* Stats Cards */}
                <div className="stats-cards">
                    <div className="card">
                        <i className="fas fa-users"></i>
                        <div>
                            <h3>Total Employees</h3>
                            <p>{employeeCount}</p> {/* Display dynamic employee count */}
                        </div>
                    </div>

                    <div className="card">
                        <i className="fas fa-user-md"></i>
                        <div>
                            <h3>Doctors Registered</h3>
                            <p>3,200</p>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fas fa-map-marker-alt"></i>
                        <div>
                            <h3>Active Employees</h3>
                            <p>2,503</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

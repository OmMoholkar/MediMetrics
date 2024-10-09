import React from 'react';
import './Dashboard.css';

const Dashboard = ({ onMenuClick }) => {
    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="logo">GEOMR</div>
                <ul>
                    <li className="active" onClick={() => onMenuClick('dashboard')}>
                        <i className="fas fa-home"></i> Dashboard
                    </li>
                    <li onClick={() => onMenuClick('employeeForm')}>
                        <i className="fas fa-user"></i> Employees
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
                            <p>3,200</p>
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

import React from 'react';
import './App.css';
import Header from './components/Header';
import EmployeeForm from './components/EmployeeForm';
import Login from './components/Login'; // Import the Login component

const App = () => {
    return (
        <div className="App">
            <Header />
            <Login />  {/* Use the Login component here */}
            <EmployeeForm />
        </div>
    );
};

export default App;

import React, { useState } from 'react';
import './EmployeeForm.css'; // Make sure this path is correct

const EmployeeForm = () => {
    const [employee, setEmployee] = useState({ name: '', age: '', area: '', username: '', password: '' });
    const [photo, setPhoto] = useState(null); // For photo upload

    const handleChange = (e) => {
        if (e.target.name === "photo") {
            setPhoto(e.target.files[0]);
        } else {
            setEmployee({ ...employee, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('age', employee.age);
        formData.append('username', employee.username);
        formData.append('password', employee.password);
        formData.append('area', employee.area);
        if (photo) {
            formData.append('photo', photo);
        }

        try {
            const response = await fetch('http://localhost/Geofence/attendance/submit-employee.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log('Response from server:', result);
            if (result.success) {
                alert(result.success);
            } else {
                alert(result.error || 'Unknown error occurred');
            }
            setEmployee({ name: '', age: '', username: '', password: '', area: '' });
            setPhoto(null);
        } catch (error) {
            console.error('Error submitting employee data:', error);
        }
    };

    return (
        <div className="form-container">
            <form className="employee-form" onSubmit={handleSubmit}>
                <h2>Employee Form</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={employee.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" value={employee.age} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Area</label>
                    <input type="text" name="area" value={employee.area} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={employee.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={employee.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Photo</label>
                    <input type="file" name="photo" onChange={handleChange} required />
                </div>
                <div className="form-actions">
                    <button type="submit" className="add-btn">Submit</button>
                    <button type="reset" className="reset-btn">Reset</button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;

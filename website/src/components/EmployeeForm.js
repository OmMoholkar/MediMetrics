import React, { useState } from 'react';
import './EmployeeForm.css'; // Make sure this path is correct

const EmployeeForm = () => {
    const [employee, setEmployee] = useState({ name: '', age: '', area: '', username: '', password: '' });
    const [photo, setPhoto] = useState(null); // For photo upload
    const [error, setError] = useState(''); // For error messages
    const [successMessage, setSuccessMessage] = useState(''); // For success messages

    // Max file size in bytes (5MB here)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

    const handleChange = (e) => {
        if (e.target.name === "photo") {
            const file = e.target.files[0];

            // File size validation
            if (file && file.size > MAX_FILE_SIZE) {
                setError('File size exceeds 5MB.');
                setPhoto(null);
                return;
            }

            // File type validation
            if (file && !ALLOWED_FILE_TYPES.includes(file.type)) {
                setError('Invalid file type. Only JPG, JPEG, and PNG are allowed.');
                setPhoto(null);
                return;
            }

            // If no error, clear the error and set the photo
            setError('');
            setPhoto(file);
        } else {
            setEmployee({ ...employee, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent form submission if there is an error or no photo is selected
        if (error || !photo) {
            return;
        }

        // Validate required fields
        if (!employee.name || !employee.age || !employee.username || !employee.password || !employee.area) {
            setError('Please fill out all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('age', employee.age);
        formData.append('username', employee.username);
        formData.append('password', employee.password);
        formData.append('area', employee.area);
        formData.append('photo', photo);

        try {
            const response = await fetch('http://localhost/MediMetrics_Github_Repo/website/submit-employee.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log('Response from server:', result);
            if (result.success) {
                setSuccessMessage(result.success);
                setError('');
            } else {
                setError(result.error || 'Unknown error occurred');
                setSuccessMessage('');
            }
            setEmployee({ name: '', age: '', username: '', password: '', area: '' });
            setPhoto(null);
            document.querySelector('input[name="photo"]').value = ''; // Reset file input
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

                {/* Display the error message above the submit button */}
                {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</p>}

                <div className="form-actions">
                    <button type="submit" className="add-btn">Submit</button>
                    <button type="reset" className="reset-btn">Reset</button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;

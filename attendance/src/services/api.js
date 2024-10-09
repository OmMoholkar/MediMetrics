// src/services/api.js

const API_URL = 'http://localhost/Geofence/attendance/login.php'; // Update to your actual URL

export const loginEmployee = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: username,
                password: password,
            }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, error: 'Network error' };
    }
};

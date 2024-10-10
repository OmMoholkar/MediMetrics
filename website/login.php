<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Enable detailed error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

<<<<<<< HEAD
$host = "localhost";
$dbname = "medimetrics_db";
$db_username = "root";
$db_password = "";

$conn = new mysqli($host, $db_username, $db_password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the POST request
$userId = $_POST['userId'];
$userPassword = $_POST['password'];

// Prepare the SQL query
$sql = "SELECT name, area, photo FROM employee WHERE username = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $userId, $userPassword);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $employee = $result->fetch_assoc(); 
    echo json_encode(array(
        "status" => "success",
        "name" => $employee['name'],
        "area" => $employee['area'],
        "photo" => $employee['photo']
    ));
} else {
    echo json_encode(array("status" => "failure"));
}

$stmt->close();
$conn->close();
?>

=======
// Database connection (replace with your actual connection details)
$servername = "localhost"; // your server name
$username = "root"; // your database username
$password = ""; // your database password
$dbname = "attendance_db"; // your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Database connection failed: ' . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // Prepare the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM employee WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User found, login successful
        echo json_encode(['success' => true, 'message' => 'Login successful.']);
    } else {
        // Invalid credentials
        echo json_encode(['success' => false, 'error' => 'Invalid username or password.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}

$conn->close();
?>
>>>>>>> ad354e16f73c5b8c0c589a75222b864fb366852a

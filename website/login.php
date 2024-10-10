<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Enable detailed error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin (for development purposes)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers

$servername = "localhost"; // Your server name
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "medimetrics_db"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize response array
$response = [];

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $_POST['name'];
    $age = $_POST['age'];
    $area = $_POST['area'];
    $username = $_POST['username'];
    $password = $_POST['password']; // Hash the password

    // File upload handling
    $photo = $_FILES['photo'];
    $targetDir = "uploads/"; // Directory to save uploaded files
    $targetFile = $targetDir . basename($photo["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Check if file is an actual image
    $check = getimagesize($photo["tmp_name"]);
    if ($check === false) {
        $response['error'] = "File is not an image.";
        $uploadOk = 0;
    }

    // Check file size (5MB limit)
    if ($photo["size"] > 5000000) {
        $response['error'] = "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if (!in_array($imageFileType, ['jpg', 'png', 'jpeg', 'gif'])) {
        $response['error'] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    // Check if everything is ok to upload
    if ($uploadOk == 0) {
        $response['error'] = "Sorry, your file was not uploaded.";
    } else {
        // Try to upload file
        if (move_uploaded_file($photo["tmp_name"], $targetFile)) {
            // Prepare SQL statement
            $stmt = $conn->prepare("INSERT INTO employee (name, age, area, username, password, photo) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sissss", $name, $age, $area, $username, $password, $targetFile);

            if ($stmt->execute()) {
                $response['success'] = "Employee data submitted successfully.";
            } else {
                $response['error'] = "Error: " . $stmt->error;
            }

            $stmt->close();
        } else {
            $response['error'] = "Sorry, there was an error uploading your file.";
        }
    }
} else {
    $response['error'] = "Invalid request method.";
}

// Close connection
$conn->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>


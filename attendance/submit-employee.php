<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Enable detailed error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $age = $_POST['age'] ?? '';
    $area = $_POST['area'] ?? '';
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    $photoPath = '';
    $uploadSuccess = false;

    // Check if file is uploaded
    if (isset($_FILES['photo'])) {
        $photo = $_FILES['photo'];
        $fileError = $photo['error'];

        // Log file upload details
        error_log("File upload details: " . print_r($photo, true));

        // Error during file upload
        if ($fileError !== UPLOAD_ERR_OK) {
            $uploadError = 'File upload error: ';
            switch ($fileError) {
                case UPLOAD_ERR_INI_SIZE:
                    $uploadError .= 'The uploaded file exceeds the upload_max_filesize directive in php.ini.';
                    break;
                case UPLOAD_ERR_FORM_SIZE:
                    $uploadError .= 'The uploaded file exceeds the MAX_FILE_SIZE directive specified in the HTML form.';
                    break;
                case UPLOAD_ERR_PARTIAL:
                    $uploadError .= 'The file was only partially uploaded.';
                    break;
                case UPLOAD_ERR_NO_FILE:
                    $uploadError .= 'No file was uploaded.';
                    break;
                case UPLOAD_ERR_NO_TMP_DIR:
                    $uploadError .= 'Missing a temporary folder.';
                    break;
                case UPLOAD_ERR_CANT_WRITE:
                    $uploadError .= 'Failed to write file to disk.';
                    break;
                case UPLOAD_ERR_EXTENSION:
                    $uploadError .= 'A PHP extension stopped the file upload.';
                    break;
                default:
                    $uploadError .= 'Unknown upload error.';
                    break;
            }
            echo json_encode(['success' => false, 'error' => $uploadError]);
            exit;
        }

        // File size check (maximum 10MB)
        if ($photo['size'] > 10485760) {
            echo json_encode(['success' => false, 'error' => 'File size exceeds 10MB limit.']);
            exit;
        }

        // File type check
        $allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($photo['type'], $allowedFileTypes)) {
            echo json_encode(['success' => false, 'error' => 'Unsupported file type. Only JPEG, PNG, and GIF allowed.']);
            exit;
        }

        // Sanitize file name
        $fileName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $photo['name']);
        $photoPath = 'uploads/' . $fileName;

        // Create the uploads directory if it doesn't exist
        if (!is_dir('uploads')) {
            mkdir('uploads', 0777, true);
        }

        // Move the uploaded file
        if (move_uploaded_file($photo['tmp_name'], $photoPath)) {
            $uploadSuccess = true;
        } else {
            error_log("File upload error: " . print_r($_FILES['photo'], true));
            echo json_encode(['success' => false, 'error' => 'Failed to move uploaded photo.']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'No photo uploaded.']);
        exit;
    }

    // Save the employee data if photo upload was successful
    if ($uploadSuccess) {
        $data = "Name: $name, Age: $age, Area: $area, Username: $username, Password: $password, Photo: $photoPath\n";
        file_put_contents('employees.txt', $data, FILE_APPEND | LOCK_EX);

        echo json_encode(['success' => 'Employee data saved successfully, and photo uploaded.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>

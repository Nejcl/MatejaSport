<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$file = $_FILES['upload']['tmp_name'];
$fileName = $_FILES['upload']['name'];
$remote_file = '/web/uploads/'.$fileName;
$file_url = '/uploads/'.$fileName;

$ftp_server = 'matejasport.si';
$ftp_user_name = 'matejasportlukaleban';
$ftp_user_pass = 'juma2214';

// set up basic connection
$conn_id = ftp_connect($ftp_server, 10021);
ftp_pasv($conn_id, true); 
// login with username and password
$login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);

// check connection
if ((!$conn_id) || (!$login_result)) { 
    echo "FTP connection has failed!";
    exit; 
} 

// upload a file
if (ftp_put($conn_id, $remote_file, $file, FTP_BINARY)) {
    $response = array(
        "status" => "success",
        "error" => false,
        "message" => "File uploaded successfully",
        "url" => $file_url
      );
} else {
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "Error uploading the file!",
        "url" => "",

    );
}
echo json_encode($response);
// close the connection
ftp_close($conn_id);

?>
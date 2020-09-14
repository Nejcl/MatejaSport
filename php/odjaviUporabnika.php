<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "matejasport.si";
$username = "admin";
$password = "juma2214";
$dbname = "webdata";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  
  $request = json_decode($postdata);
  
  // Sanitize.
  $id = mysqli_real_escape_string($conn, trim($request->id));

  // Store.
  $sql = "DELETE FROM `prijaveNaTermin` WHERE`Id`='{$id}'";

  if(mysqli_query($conn,$sql))
  {
    http_response_code(201);
    $data = [
      'resp'    => 'odjavljen',
    ];
    echo json_encode($data);
  }
  else
  {
    http_response_code(422);
  }

}


$conn->close();
?>
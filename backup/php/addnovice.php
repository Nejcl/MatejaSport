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
  $naslovna = mysqli_real_escape_string($conn, trim($request->naslovna));
  $naslov = mysqli_real_escape_string($conn, trim($request->naslov));
  $vsebina = mysqli_real_escape_string($conn, trim($request->vsebina));

  // Store.
  $sql = "INSERT INTO `novicetest`(`id`,`naslovna`,`naslov`,`vsebina`) VALUES (null,'{$naslovna}','{$naslov}','{$vsebina}')";

  if(mysqli_query($conn,$sql))
  {
    http_response_code(201);
    $data = [
      'id'    => mysqli_insert_id($conn),
      'naslovna' => $naslovna,
      'naslov' => $naslov,
      'vsebina' => $vsebina,
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
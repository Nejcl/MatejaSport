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
  $dan = mysqli_real_escape_string($conn, trim($request->dan));
  $od = mysqli_real_escape_string($conn, trim($request->od));
  $do = mysqli_real_escape_string($conn, trim($request->do));
  $naziv = mysqli_real_escape_string($conn, trim($request->naziv));
  $vodi = mysqli_real_escape_string($conn, trim($request->vodi));
  $color = mysqli_real_escape_string($conn, trim($request->color));

  // Store.
  $sql = "UPDATE `urniktest` SET `dan`='{$dan}',`od`='{$od}',`do`='{$do}',`naziv`='{$naziv}',`vodi`='{$vodi}',`color`='{$color}' WHERE `id`='{$id}'";

  if(mysqli_query($conn,$sql))
  {
    http_response_code(201);
    $data = [
      'id'    => $id,
      'dan' => $dan,
      'od' => $od,
      'do' => $do,
      'naziv' => $naziv,
      'vodi' => $vodi,
      'color' => $color
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
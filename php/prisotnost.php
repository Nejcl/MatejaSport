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
 $request = json_decode($postdata);
  
 $input = json_decode($postdata);

 $id_termin = mysqli_real_escape_string($conn, trim($input->id_termin));
 $prisotnost = $input->prisotnost;

 $sql1 = "UPDATE prijaveNaTermin SET `prisotnost`= 0 WHERE id_termin='{$id_termin}'";
 mysqli_query($conn,$sql1);

  foreach($prisotnost as $prisotni => $prisoten) {
    $id_prijava = mysqli_real_escape_string($conn, trim($prisoten->id_prijava));
      // Store.
    $sql = "UPDATE prijaveNaTermin SET `prisotnost`= 1 WHERE id='{$id_prijava}'";
    mysqli_query($conn,$sql);
  }
  $data2 = [
    'prisotnost' => 'OK',
  ];
  echo json_encode($data2);
  http_response_code(201);
}
else
{
  $data2 = [
    'prisotnost' => 'NOK'
    ];
  echo json_encode($data2);
}

$conn->close();
?>
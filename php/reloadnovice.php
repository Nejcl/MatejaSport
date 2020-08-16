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
$sql1 = "TRUNCATE TABLE novicetest";
$sql2 = "INSERT novicetest SELECT * FROM novice";
$sql3 = "SELECT * FROM novicetest";

if(mysqli_query($conn,$sql1))
  {
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }

  if(mysqli_query($conn,$sql2))
  {
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }

  if($result = mysqli_query($conn,$sql3))
 {
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      $data[$cr]['id'] = $row['id'];
      $data[$cr]['naslovna'] = $row['naslovna'];
      $data[$cr]['naslov'] = $row['naslov'];
      $data[$cr]['vsebina'] = $row['vsebina'];
      $cr++;
    }
   print json_encode($data);
  
} else {
    echo "0 results";
}

$conn->close();
?>
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

$sql = "SELECT * FROM urnik2";

$data = [];

if($result = mysqli_query($conn,$sql))
 {
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      $data[$cr]['id'] = $row['id'];
      $data[$cr]['dan'] = $row['dan'];
      $data[$cr]['od'] = $row['od'];
      $data[$cr]['do'] = $row['do'];
      $data[$cr]['naziv'] = $row['naziv'];
      $data[$cr]['vodi'] = $row['vodi'];
      $data[$cr]['color'] = $row['color'];
      $cr++;
    }
   print json_encode($data);

} else {
    echo "0 results";
}

$conn->close();
?>

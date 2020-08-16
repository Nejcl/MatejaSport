<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$servername = "matejasport.si:3306";
$username = "admin";
$password = "juma2214";
$dbname = "webdata";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT dan, od, do, naziv, vodi, color FROM urniktest";


if($result = mysqli_query($conn,$sql))
 {
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      $data[$cr]['dan'] = $row['dan'];
      $data[$cr]['od'] = $row['od'];
      $data[$cr]['do'] = $row['do'];
      $data[$cr]['naziv'] = $row['naziv'];
      $data[$cr]['vodi'] = $row['vodi'];
      $data[$cr]['color'] = $row['color'];
      $cr++;
    }
   echo json_encode($data);
  

} else {
    echo "0 results";
}
$conn->close();
?>
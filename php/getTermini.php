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

$sql = "SELECT t.ID_termin,t.naziv,t.instruktor,t.datum,t.od,t.do,CONCAT(COUNT(pt.Id_uporabnik) , '/', t.st_mest) AS zasedenost FROM termini t INNER JOIN prijaveNaTermin pt ON t.ID_termin =pt.Id_termin ";

$data = [];

if($result = mysqli_query($conn,$sql))
 {
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      $data[$cr]['id'] = $row['ID_termin'];
      $data[$cr]['naziv'] = $row['naziv'];
      $data[$cr]['instruktor'] = $row['instruktor'];
      $data[$cr]['datum'] = $row['datum'];
      $data[$cr]['od'] = $row['od'];
      $data[$cr]['do'] = $row['do'];
      $data[$cr]['zasedenost'] = $row['zasedenost'];
      $cr++;
    }
   print json_encode($data);
  
} else {
    echo "0 results";
}

$conn->close();
?>
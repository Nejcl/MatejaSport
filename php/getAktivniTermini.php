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

  $user = mysqli_real_escape_string($conn, trim($input->user));
  $date_now = date("Y-m-d"); // this format is string comparable

  $sql = "SELECT pt.Id,t.ID_termin,t.naziv,t.instruktor,t.barva,t.datum,t.od,t.do,CONCAT((SELECT COUNT(*) FROM prijaveNaTermin WHERE id_termin=t.ID_termin) , '/', t.st_mest) AS zasedenost,t.status,t.st_mest FROM termini t LEFT JOIN prijaveNaTermin pt ON t.ID_termin =pt.Id_termin WHERE t.datum >='{$date_now}' AND pt.id_uporabnik = '{$user}' GROUP BY t.ID_termin ORDER BY t.datum ";

  $data = [];
  
  if($result = mysqli_query($conn,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id_prijava'] = $row['Id'];
        $data[$cr]['id_termin'] = $row['ID_termin'];
        $data[$cr]['naziv'] = $row['naziv'];
        $data[$cr]['instruktor'] = $row['instruktor'];
        $data[$cr]['datum'] = $row['datum'];
        $data[$cr]['od'] = $row['od'];
        $data[$cr]['do'] = $row['do'];
        $data[$cr]['zasedenost'] = $row['zasedenost'];
        $data[$cr]['barva'] = $row['barva'];
        $data[$cr]['status'] = $row['status'];
        $data[$cr]['st_mest'] = $row['st_mest'];
        $cr++;
      }
      print json_encode($data);
    
  } else {
      echo "0 results";
  }
} else {
  $data2 = [
    'termin'    => 'NOK'
    ];
  echo json_encode($data2);
}



$conn->close();
?>
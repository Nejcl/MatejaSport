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
  $id_termin = mysqli_real_escape_string($conn, trim($request->id_termin));
  // Store.
  $sql = "DELETE FROM `prijaveNaTermin` WHERE`Id`='{$id}'";
  $sql1 = "SELECT t.status, COUNT(r.Id_uporabnik)  AS rezerve, COUNT(pt.Id_uporabnik) AS zasedenost, t.st_mest FROM termini t LEFT JOIN rezerveTermin r ON t.ID_termin = r.id_termin LEFT JOIN prijaveNaTermin pt ON t.ID_termin =pt.Id_termin  WHERE t.Id_termin = '{$id_termin}'GROUP BY t.ID_termin"; 

  if(mysqli_query($conn,$sql))
  {
    http_response_code(201);
    $data = [
      'resp'    => 'odjavljen',
    ];
    echo json_encode($data);
    $result = mysqli_query($conn, $sql1);
    if (mysqli_num_rows($result) > 0) {
      // output data of each row
      while($row = mysqli_fetch_assoc($result)) {
        if($row["status"] == 'zaseden' && $row["rezerve"] == 0 && $row["zasedenost"] < $row["st_mest"]){
          $sql2 ="UPDATE `termini` SET `status`='razpisan' WHERE `ID_termin`='{$id_termin}'";
          mysqli_query($conn, $sql2);
        }
        if($row["status"] == 'zaseden' && $row["rezerve"] > 0){
          $sql4 = "UPDATE `termini` SET `notification`= 1 WHERE `ID_termin`='{$id_termin}'";
          mysqli_query($conn, $sql4);
        }

      }
    }
  }
  else
  {
    http_response_code(422);
  }

}


$conn->close();
?>
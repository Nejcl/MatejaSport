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

 $id = mysqli_real_escape_string($conn, trim($request->id));
 $naziv = mysqli_real_escape_string($conn, trim($input->naziv));
 $instruktor = mysqli_real_escape_string($conn, trim($input->instruktor));
 $barva = mysqli_real_escape_string($conn, trim($input->barva));
 $datum = mysqli_real_escape_string($conn, trim($input->datum));
 $od = mysqli_real_escape_string($conn, trim($input->od));
 $do = mysqli_real_escape_string($conn, trim($input->do));
 $st_mest = mysqli_real_escape_string($conn, trim($input->st_mest));

  // Store.
  $sql = "UPDATE `termini` SET `naziv`='{$naziv}', `instruktor`= '{$instruktor}',`barva`= '{$barva}', `datum`='{$datum}', `od`='{$od}', `do`= '{$do}',`st_mest`='{$st_mest}' WHERE `ID_termin`='{$id}'";

  if(mysqli_query($conn,$sql))
  {
    $data2 = [
      'termin' => 'OK',
    ];
    echo json_encode($data2);
    http_response_code(201);
  }
  $sql1 = "SELECT COUNT(pt.Id_uporabnik) AS zasedenost, t.st_mest FROM termini t LEFT JOIN prijaveNaTermin pt ON t.ID_termin =pt.Id_termin WHERE  pt.Id_termin = '{$id}' AND pt.Id_uporabnik != 0 GROUP BY t.ID_termin"; 
  $result = mysqli_query($conn, $sql1);
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      if($row["zasedenost"] >= $row["st_mest"]){
        $sql2 ="UPDATE `termini` SET `status`='zaseden',`notification`= 0 WHERE `ID_termin`='{$id}'";
        mysqli_query($conn, $sql2);
      } else if($row["zasedenost"] < $row["st_mest"]){
        $sql2 ="UPDATE `termini` SET `status`='razpisan',`notification`= 0 WHERE `ID_termin`='{$id}'";
        mysqli_query($conn, $sql2);
      }
    }
  } 
}
else
{
  $data2 = [
    'termin'    => 'NOK'
    ];
  echo json_encode($data2);
}
$conn->close();
?>
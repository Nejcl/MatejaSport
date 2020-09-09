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

 $naziv = mysqli_real_escape_string($conn, trim($input->naziv));
 $vodi = mysqli_real_escape_string($conn, trim($input->vodi));
 $barva = mysqli_real_escape_string($conn, trim($input->barva));
 $datum = mysqli_real_escape_string($conn, trim($input->datum));
 $od = mysqli_real_escape_string($conn, trim($input->od));
 $do = mysqli_real_escape_string($conn, trim($input->do));
 $st_mest = mysqli_real_escape_string($conn, trim($input->st_mest));

  // Store.
  $sql = "INSERT INTO `termini`(`naziv`,`instruktor`, `barva`, `datum`, `od`, `do`,`st_mest`,`status`) VALUES ('{$naziv}','{$vodi}','{$barva}','{$datum}','{$od}','{$do}','{$st_mest}','razpisan')";

  if(mysqli_query($conn,$sql))
  {
    $data2 = [
      'termin' => 'OK',
      'datum' => $datum,
      'od' => $od,
      'do' => $do,
      'naziv' => $naziv,
    ];
    echo json_encode($data2);
    http_response_code(201);
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
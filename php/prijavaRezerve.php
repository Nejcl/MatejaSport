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
  $id_termin = mysqli_real_escape_string($conn, trim($request->id_termin));
  $id_uporabnik = mysqli_real_escape_string($conn, trim($request->id_uporabnik));


  // Store.
  $sql1 = "SELECT COUNT(Id_uporabnik)+1 AS mesto FROM rezerveTermin WHERE Id_termin = '{$id_termin}'"; 
  $result = mysqli_query($conn, $sql1);
  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        $sql = "INSERT INTO `rezerveTermin`(`Id_termin`,`Id_uporabnik`,`mesto`) VALUES ('{$id_termin}','{$id_uporabnik}','{$row["mesto"]}')";
        if(mysqli_query($conn,$sql))
          {
            http_response_code(201);
            $data = [
              'resp'    => 'prijavljen',
            ];
            echo json_encode($data);
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
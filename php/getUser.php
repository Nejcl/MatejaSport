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


  $sql = "SELECT * FROM uporabniki WHERE `ID_uporabnik`='{$id}'";

  $data = [];
  
  if($result = mysqli_query($conn,$sql))
    {
      while($row = mysqli_fetch_assoc($result))
      {
        $data = [
          'id' => $row['ID_uporabnik'],
          'uporabnik'  => $row['uporabnik'],
          'ime'  => $row['ime'],
          'priimek' => $row['priimek'],
          'email'  => $row['email'],
          'telefon'  => $row['telefon']
          ];
      }
      print json_encode($data);
    
  } else {
      echo "0 results";
  }
} else {
  $data2 = [
    'user'    => 'NOK'
    ];
  echo json_encode($data2);
}

$conn->close();
?>
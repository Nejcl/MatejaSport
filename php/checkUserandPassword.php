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

 $input = json_decode($postdata);
 $user = mysqli_real_escape_string($conn, trim($input->user));
 $pw = mysqli_real_escape_string($conn, trim($input->pw));
  $sql = "SELECT uporabnik,geslo FROM `uporabniki` WHERE uporabnik='{$user}'";

  $data = [];
  
  if($result = mysqli_query($conn,$sql))
   {
      $cr = 0;
      $userOk = false;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['uporabnik'] = $row['uporabnik'];
        $data[$cr]['geslo'] = $row['geslo'];
        if($data[$cr]['uporabnik'] == $user && $data[$cr]['geslo'] == $pw )
        {
          $data2 = [
            'pw'    => 'OK'
            ];
          echo json_encode($data2);
          $userOk = true;
          break;
        }
        $cr++;
      }
      if(mysqli_num_rows($result) == 0 || $userOk == false )
      {
        $data2 = [
          'pw'    => 'NOK'
          ];
        echo json_encode($data2);
      }
  } else {
      echo "Error";
  }
$conn->close();
?>
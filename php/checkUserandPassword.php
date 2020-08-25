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

  $sql = "SELECT * FROM `uporabniki` WHERE uporabnik='{$user}'";

  $data = [];
  
  if($result = mysqli_query($conn,$sql))
   {
      $cr = 0;
      $userOk = false;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['uporabnik'] == $user && password_verify($pw,$row['geslo']))
        {
          if($row['aktiviran'] > 0){
            $data2 = [
              'pw'    => 'OK',
              'user' =>    $row['uporabnik'],
              'id'    =>   $row['ID_uporabnik'],
              'ime' =>  $row['ime'],
              'priimek' =>  $row['priimek'],
              'obiski'    =>    $row['obiski'],
              'prijave' =>  $row['prijave'],
              'veljavnost' => $row['veljavnost'],
              ];
            echo json_encode($data2);
            $userOk = true;
            break;
          }
          else {
            $data2 = [
              'pw'    => 'aktiviran',
              ];
            echo json_encode($data2);
            $userOk = true;
            break;
          }
        }
        $cr++;
      }
      if(mysqli_num_rows($result) == 0 || $userOk == false )
      {
        $data2 = [
          'pw'    => 'NOK',
          ];
        echo json_encode($data2);
      }
  } else {
      echo "Error";
  }
$conn->close();
?>
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
 $user = mysqli_real_escape_string($conn, trim($input->userName));
 $pw = mysqli_real_escape_string($conn, trim($input->password));
 $hashed_password = password_hash($pw, PASSWORD_DEFAULT);

 $fname = mysqli_real_escape_string($conn, trim($input->firstName));
 $lname = mysqli_real_escape_string($conn, trim($input->lastName));
 $email = mysqli_real_escape_string($conn, trim($input->email));
 $phone = mysqli_real_escape_string($conn, trim($input->phone));

  // Store.
  $sql = "INSERT INTO `uporabniki`(`uporabnik`,`ime`, `priimek`, `geslo`, `email`, `telefon`) VALUES ('{$user}','{$fname}','{$lname}','{$hashed_password}','{$email}','{$phone}')";

  if(mysqli_query($conn,$sql))
  {
    $data2 = [
      'registration'    => 'OK',
      'id'    => mysqli_insert_id($conn),
      'user' => $user,
      'ime' => $fname,
      'priimek' => $lname,
    ];
    echo json_encode($data2);
    http_response_code(201);
  }
}
else
{
  $data2 = [
    'registration'    => 'NOK'
    ];
  echo json_encode($data2);
}
$conn->close();
?>
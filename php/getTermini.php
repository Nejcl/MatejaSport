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

  $od = mysqli_real_escape_string($conn, trim($input->startDate));
  $do = mysqli_real_escape_string($conn, trim($input->endDate));

  $sql = "SELECT t.ID_termin,t.naziv,t.instruktor,t.barva,t.datum,t.od,t.do,CONCAT(COUNT(pt.Id_uporabnik) , '/', t.st_mest) AS zasedenost,t.status,t.st_mest FROM termini t LEFT JOIN prijaveNaTermin pt ON t.ID_termin =pt.Id_termin WHERE t.datum BETWEEN '{$od}' AND '{$do}' GROUP BY t.ID_termin ORDER BY t.datum ";

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
        $data[$cr]['barva'] = $row['barva'];
        $data[$cr]['status'] = $row['status'];
        $data[$cr]['st_mest'] = $row['st_mest'];
        $sqlU = "SELECT  pt.Id,u.ID_uporabnik, ime, priimek,email,telefon FROM prijaveNaTermin pt INNER JOIN uporabniki u ON pt.Id_uporabnik = u.ID_uporabnik  WHERE ID_termin ={$row['ID_termin']}";
        if($res = mysqli_query($conn,$sqlU)){
          $cru = 0;
          while($rowU = mysqli_fetch_assoc($res))
          {
            $data[$cr]['prijavljeni'][$cru]['Id'] = $rowU['Id'];
            $data[$cr]['prijavljeni'][$cru]['ID_uporabnik'] = $rowU['ID_uporabnik'];
            $data[$cr]['prijavljeni'][$cru]['ime'] = $rowU['ime'];
            $data[$cr]['prijavljeni'][$cru]['priimek'] = $rowU['priimek'];
            $data[$cr]['prijavljeni'][$cru]['email'] = $rowU['email'];
            $data[$cr]['prijavljeni'][$cru]['telefon'] = $rowU['telefon'];
  
            $cru++;
          }
          if ( 0===$cru ) { 
            $data[$cr]['prijavljeni'] = 'ni prijav';
          } 
        }
        $sqlR = "SELECT  rt.Id,rt.ID_termin,u.ID_uporabnik, ime, priimek,email,telefon FROM rezerveTermin rt INNER JOIN uporabniki u ON rt.Id_uporabnik = u.ID_uporabnik  WHERE ID_termin ={$row['ID_termin']}";
        if($res = mysqli_query($conn,$sqlR)){
          $crr = 0;
          while($rowR = mysqli_fetch_assoc($res))
          {
            $data[$cr]['rezerve'][$crr]['Id'] = $rowR['Id'];
            $data[$cr]['rezerve'][$crr]['ID_uporabnik'] = $rowR['ID_uporabnik'];
            $data[$cr]['rezerve'][$crr]['ID_termin'] = $rowR['ID_termin'];
            $data[$cr]['rezerve'][$crr]['ime'] = $rowR['ime'];
            $data[$cr]['rezerve'][$crr]['priimek'] = $rowR['priimek'];
            $data[$cr]['rezerve'][$crr]['email'] = $rowR['email'];
            $data[$cr]['rezerve'][$crr]['telefon'] = $rowR['telefon'];
            $crr++;
          }
        }
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
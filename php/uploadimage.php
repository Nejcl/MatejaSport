<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$file_name = $_FILES['upload']['name'];
$file_tmp_name = $_FILES['upload']['tmp_name'];
$error = $_FILES['upload']['error'];

$response = array();
$upload_dir = '/uploads';
$server_url = 'http://www.matejasport.si';

if($error > 0){
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "Error uploading the file!",
        "url" => ""
    );
}else 
{
    $upload_name = strtolower($file_name);
    $upload_name = preg_replace('/\s+/', '-', $upload_name);

    if(move_uploaded_file($file_tmp_name, $upload_name)) {
        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "File uploaded successfully",
            "url" => $upload_name
          );
    }else
    {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!",
            "url" => ""
        );
    }
}


echo json_encode($response);


?>
<?php

// db credentials
define('DB_HOST', 'matejasport.si');
define('DB_USER', 'admin');
define('DB_PASS', 'juma2214');
define('DB_NAME', 'WebData');

// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf16");

  return $connect;
}

$con = connect();
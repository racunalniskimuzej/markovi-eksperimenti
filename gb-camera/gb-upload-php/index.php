<?php
date_default_timezone_set('Europe/Ljubljana');

if (isset($_FILES["fajl"]["name"])) { 
 move_uploaded_file($_FILES["fajl"]["tmp_name"], "upload/GameBoy_" . time() . ".jpg");
 echo "OK";
 exit;
}

$files = array_values(array_diff(scandir('upload', SCANDIR_SORT_DESCENDING), array('..', '.', 'index.php')));
header('Content-type: image/jpeg');
header('Content-Disposition: attachment; filename="' . $files[0] . '"');
readfile('upload/' . $files[0]);

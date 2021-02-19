<?php
$url = $_GET['url'];
if (stripos($url, "http") === false) $url = "http://zbirka.muzej.si{$url}";
echo file_get_contents($url, false, stream_context_create(array('http' => array('ignore_errors' => true))));
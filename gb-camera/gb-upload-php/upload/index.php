<?php

$files = array_values(array_diff(scandir('.', SCANDIR_SORT_DESCENDING), array('..', '.', 'index.php')));
for ($i = 0; $i < min(10, count($files)); $i++) {
 echo "<p><img src='{$files[$i]}'></p>\n";
}

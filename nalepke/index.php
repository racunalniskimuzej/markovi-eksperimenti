<?php

//Office Line B8151095
$labelWmm = 64.6;
$labelHmm = 33.8;
$labelsPerRow = 3;
$labelsPerPage = 24;
$labelHspacing = 0;
$fontSize = 10;
$textPadding = 13;

//Avery Zweckform L6009
if ($_GET['tip'] == "zweck") {
 $labelWmm = 45.7;
 $labelHmm = 21.2;
 $labelsPerRow = 4;
 $labelsPerPage = 48;
 $labelHspacing = 2.5;
 $fontSize = 7;
 $textPadding = 11;
}

require_once('TCPDF-main/tcpdf.php');

$pdf = new TCPDF(PDF_PAGE_ORIENTATION, 'mm', 'A4', true, 'UTF-8', false);

$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Racunalniski muzej');
$pdf->SetTitle('Nalepke');
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->SetFont('courier', '', $fontSize);

$a4Wmm = 210;
$a4Hmm = 297;
$magic = $labelHmm / 1.965; //found by trial and error ;)
$pdf->setMargins(($a4Wmm - ($labelWmm * $labelsPerRow) - ($labelHspacing * ($labelsPerRow-1))) / 2, $magic + (($a4Hmm - (($labelsPerPage/$labelsPerRow) * $labelHmm)) / 2));
$pdf->SetAutoPageBreak(TRUE, -10);
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

$pdf->AddPage();

$stevilke = array();
if (isset($_GET['od']) && isset($_GET['do'])) {
	$stevilke = range(intval($_GET['od']), intval($_GET['do']));
} else if (isset($_GET['seznam'])) {
	$stevilke = explode(",", $_GET['seznam']);
}

$qty = count($stevilke);
if ($qty > 500) die("Error: more than 500 labels!");

$counter = 1;
for($i = 0 ; $i < $qty ; $i++) {
$x = $pdf->GetX();
$y = $pdf->GetY();

$qrHmm = $labelHmm / 1.69;
$qrXoffset = $labelWmm / 3.59;
$qrYoffset = $labelHmm / 3.38;
$textPad = str_repeat(" ", $textPadding);

$pdf->write2DBarcode('https://racunalniski-muzej.si/i/' . ($stevilke[$i]), 'QRCODE,Q', $x - $qrXoffset, $y - $qrYoffset, $labelWmm, $qrHmm);
$pdf->SetXY($x,$y);
$pdf->Cell($labelWmm, $labelHmm, '', 0, 0, 'L', FALSE, '', 0, FALSE, 'C', 'B');
$pdf->SetXY($x + $labelHspacing, $y);
$pdf->Cell($labelWmm, $qrYoffset * 2, $textPad . "racunalniski", 0, 0, 'L', FALSE, '', 0, FALSE, 'C', 'T');
$pdf->SetXY($x + $labelHspacing, $y);
$pdf->Cell($labelWmm, $qrYoffset, $textPad . "muzej", 0, 0, 'L', FALSE, '', 0, FALSE, 'C', 'T');
$pdf->SetXY($x + $labelHspacing, $y);
$pdf->Cell($labelWmm, $qrYoffset * 2, $textPad . "inv. st. " . ($stevilke[$i]), 0, 0, 'L', FALSE, '', 0, FALSE, 'C', 'B');

if($counter == $labelsPerRow) {
 $pdf->Ln($labelHmm);
 $counter = 1;
} else{
 $counter++;
}

if (($i +1)% $labelsPerPage == 0 && $i < $qty-1) $pdf->AddPage();
}

ob_end_clean();
$pdf->Output('nalepke.pdf', 'I');

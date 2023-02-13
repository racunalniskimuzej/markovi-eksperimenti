<?php
require_once('TCPDF-main/tcpdf.php');

$pdf = new TCPDF(PDF_PAGE_ORIENTATION, 'mm', 'A4', true, 'UTF-8', false);

$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Racunalniski muzej');
$pdf->SetTitle('Nalepke');
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

$pdf->setMargins(8.1,17.2 + 13.3);
$pdf->SetAutoPageBreak(TRUE, -10);
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

$pdf->AddPage();

$od = intval($_GET['od']);
$do = intval($_GET['do']);
if ($do == 0) $do = $od;
$qty = $do - $od + 1;

$counter = 1;

for($i = 0 ; $i < $qty ; $i++) {
$x = $pdf->GetX();
$y = $pdf->GetY();

$pdf->write2DBarcode('https://racunalniski-muzej.si/i/' . ($od + $i), 'QRCODE,Q', $x - 18, $y - 10, 64.6, 20);
$pdf->SetXY($x,$y);
$pdf->Cell(64.6, 33.8, '', 0, 0, 'L', FALSE, '', 0, FALSE, 'C', 'B');
$pdf->SetFont('courier', '', 10);
$pdf->SetXY($x,$y);
$pdf->Cell(64.6, 20, "             racunalniski", 0, 0, 'L', FALSE, '', 0, FALSE, 'C', 'T');
$pdf->SetXY($x,$y);
$pdf->Cell(64.6, 10, "             muzej", 0, 0, 'L', FALSE, '', 0, FALSE, 'C', 'T');
$pdf->SetXY($x,$y);
$pdf->Cell(64.6, 20, "             inv. st. " . ($od + $i), 0, 0, 'L', FALSE, '', 0, FALSE, 'C', 'B');

if($counter == 3) {
 $pdf->Ln(33.8);
 $counter = 1;
} else{
 $counter++;
}

if (($i +1)% 24 == 0 && $i < $qty-1) $pdf->AddPage();
}

ob_end_clean();
$pdf->Output('barcodes.pdf', 'I');

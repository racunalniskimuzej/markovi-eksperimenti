#!/usr/bin/env perl

use strict;
use warnings;

if ($#ARGV != 0) {
    print "ussage: drcsconv.pl <filename>.";
    exit 0;
}
my $file = $ARGV[0];

my $tmpfile = "tmp.xpm";
system("convert -flatten -negate -monochrome $file $tmpfile");

# character size : 15 x 12
my $width = 15;
my $height = 12;

my $dscs = 97;


my $column = 10;
my $row = 1;

my $imageWidth = $column * $width;
my $imageHeight = $row * $height;

print "row: $row, col: $column\n";

my @char_map;

open (IN, $tmpfile) or die "Cannot open : $!";
my $i = 0;
while (<IN>) {
    if (length($_) - 3 >= $imageWidth and $_ =~ /^"/) {
        my $r = int($i / $height);
        for my $c (0..$column - 1) {
            my $line = substr($_, 1 + $c * $width, $width);
            $char_map[$r][$c] .= $line;
        }
        $i++;
    }
}

close IN;

print "ESC P1;0;0;$width;1;2;$height;0{", chr $dscs, "\n";

for my $r (0..$row - 1) {
    
    for my $c (0..$column - 1) {
    
        my $str = $char_map[$r][$c]; 

        my @data = split(//, $str);
        my @lines = ();
        for my $y (0..($height / 6 - 1)) {
            my $line = "";
            for my $x (0..$width - 1) {
                my $acc = 0;
                for my $b (1..6) {
                    $acc *= 2;
                    my $index = ($y * 6 + 6 - $b) * $width + $x;
                    my $c = $data[$index];
                    if (not $c) {
                        print $y, "-", 
                              $b, "-", 
                              $height, "-", 
                              $#data, "#", 
                              $index, "\n";
                    }
                    if ($c eq ".") {
                        $acc += 1;
                    }
                }
                $acc += 0x3f;
                $line .= chr $acc;
            }
            push @lines, $line;
        }
        
        print join("/", @lines), ";", "\n";
    }
}    
print "ESC \\";

print "ESC (", chr $dscs;

for my $r (0..($row - 1)) {

    print "ESC #3";
    for my $c (0..$column - 1) {
        print chr (0x21 + $r * $column + $c);
    }
    print "\n";

    print "ESC #4";
    for my $c (0..$column - 1) {
        print chr (0x21 + $r * $column + $c);
    }
    print "\n";
}
print "ESC (B\n\n";

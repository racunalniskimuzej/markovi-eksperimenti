# Slovenski OS/2 Warp 4

- CD image mora biti v formatu ISO9660+Joliet - UDF ni podprt!
- Zagonske diskete se nahajajo na CDju v mapi DISKIMGS/OS2/35: DISK0.DSK, DISK1_CD.DSK, DISK2.DSK
- Originalne zagonske diskete ne podpirajo trdih diskov, večjih od 2 GB!
- OS/2 se v QEMU namesti brez posebnosti - uporabi se lahko npr. vodič iz http://sites.mpc.com.br/ric/qemu/index.html
- Splošna opomba: Občasno pride do kakega crasha/errorja, ampak velikokrat se da nadaljevati oz. ob ponovitvi ne pride do napake
- Za aktivacijo višjih resolucij slike je potrebno najprej namestiti slovenski fixpak 5 (xr2m005), ki ga lahko namestimo s pomočjo orodja SimplyFix41/sfix41, nato pa še gonilnik Scitech Display Doctor SE 7.04 (IBMSDD704); QEMU je potrebno nato zagnati s parametrom -vga cirrus, sicer pride do crasha GENPMI.DLL / c0000005

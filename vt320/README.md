![VT320](https://raw.githubusercontent.com/markostamcar/muzej.si/master/vt320/vt320.jpg)

Terminalski dostop do http://zbirka.muzej.si/
- Node.js modul v direktorju `zbirka` se namesti z `npm install`
- Shell dostop do RPi prek USB RS232 adapterja se omogoči s `systemctl daemon-reload && sudo systemctl enable serial-getty@ttyUSB0.service`
- Na RPi se ustvari nov uporabnik `zbirka` in v njegov `.profile` doda onemogočenje CTRL+C/Z/backslash in samodejni zagon Node.js aplikacije
- V `rc.local` dodan ukaz za izklop varčevanja z energijo za WiFi, saj se je na RPi 3B+ povezava sicer ob daljši neaktivnosti obešala
- Za preprosto posodabljanje Node.js modula z najnovejšo verzijo se vsako jutro ob 5:00 izvede naslednji cronjob:
`0 5 * * * pkill -KILL -u zbirka; su zbirka -c "cd /home/zbirka/muzej.si/vt320/zbirka; git pull; npm install"`
- Uspesna povezava z VT320 mi je uspela samo z originalnim Digitalovim 25-pin kablom, na katerega se nato prikljuci poljuben 25-to-9 adapter in nanj USB Serial

(Opcijsko:) Ukaz `fotka` za ASCII art iz webcam, ki ga lahko obiskovalci v zameno za donacijo tudi natisnejo na velikem Fujitsu line printerju :D

- Namestitev paketov za zajem slike iz webcama, tiskanje ter obdelavo slik:
`sudo apt install fswebcam cups graphicsmagick; sudo usermod -a -G video zbirka`
- V `.profile` pred zagonom index.js dodamo ukaz za zagon webcam serverja: `node muzej.si/vt320/zbirka/webcam.js &`
- Tiskalnik lahko priklopimo s kompatibilnim USB-to-LPT adapterjem, ki mora podpirati način "bi-directional (PS/2)" in ne samo novejših EPP/ECP; trenutno ga v muzeju nimamo, zato si bomo pomagali s print serverjem TRENDnet TE-310, ki ga usposobimo takole:
- V `/etc/dhcpcd.conf` nastavimo statičen IP za mrežno kartico: `interface eth0   static ip_address=192.168.3.10/24`
- V `/etc/rc.local` po navodilih print serverju nastavimo IP: `arp -s 192.168.3.1 00:c0:02:16:29:45`
- S `tftp` preverimo, da je v datoteki `CONFIG` na print serverju tale vrstica: `0501 LPT1MODE:Ack&Busy`
- Nato še namestimo tiskalnik: `sudo lpadmin -p tiskalnik -v lpd://192.168.3.1/L1 -E; sudo lpadmin -d tiskalnik`

Kako do šumnikov:
- VT320 podpira "download" simbolov iz strežnika (Dynamically Redefined Character Set (DRCS) - link do dokumentacije spodaj)
- Posamezne črke so velike 15x12 pikslov - uporabimo perl skripto iz spodnjega gista - za pretvorbo PNG v XPM potrebuje ImageMagick
- Skripto poženemo s `perl drcsconv.pl sumniki.png` in uporabimo vseh 10 vrstic z enkodiranimi črkami

Viri:
- https://dvdmuckle.xyz/index.php/2016/10/25/hooking-up-a-vt420-terminal-to-a-raspberry-pi/
- https://www.vt100.net/docs/vt320-uu/appendixe.html
- https://www.vt100.net/dec/vt320/soft_characters
- https://gist.github.com/markostamcar/cddbe8d0e6216c26f865e66dbba890e2

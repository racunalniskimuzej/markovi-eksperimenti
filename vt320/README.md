![VT320](https://raw.githubusercontent.com/markostamcar/muzej.si/master/vt320/vt320.jpg)

Terminalski dostop do http://zbirka.muzej.si/
- Node.js modul v direktorju `zbirka` se namesti z `npm install`
- Shell dostop do RPi prek USB RS232 adapterja se omogoči s `systemctl daemon-reload && sudo systemctl enable serial-getty@ttyUSB0.service`
- Na RPi se ustvari nov uporabnik `zbirka` in v njegov `.profile` doda onemogočenje CTRL+C/Z/backslash in samodejni zagon Node.js aplikacije
- V `rc.local` dodan ukaz za izklop varčevanja z energijo za WiFi, saj se je na RPi 3B+ povezava sicer ob daljši neaktivnosti obešala
- Za preprosto posodabljanje Node.js modula z najnovejšo verzijo se vsako jutro ob 5:00 izvede naslednji cronjob: `0 5 * * * pkill -KILL -u zbirka; su zbirka -c "cd /home/zbirka/muzej.si/vt320/zbirka; git pull; npm install"`
- Uspesna povezava z VT320 mi je uspela samo z originalnim Digitalovim 25-pin kablom, na katerega se nato prikljuci poljuben 25-to-9 adapter in nanj USB Serial

Viri:
- https://dvdmuckle.xyz/index.php/2016/10/25/hooking-up-a-vt420-terminal-to-a-raspberry-pi/

(Opcijsko) Ukaz `fotka` za ASCII art iz webcam, ki ga lahko obiskovalci v zameno za donacijo tudi natisnejo na velikem Fujitsu line printerju

- Namestitev paketov za zajem slike iz webcama, tiskanje ter obdelavo slik:
`sudo apt install fswebcam cups graphicsmagick; sudo usermod -a -G video zbirka`

- Tiskalnik lahko priklopimo s kompatibilnim USB-to-LPT adapterjem, ki mora podpirati način "bi-directional (PS/2)" in ne samo novejših EPP/ECP; trenutno ga v muzeju nimamo, zato si bomo pomagali s print serverjem TRENDnet TE-310, ki ga usposobimo takole:

V `/etc/dhcpcd.conf` nastavimo statičen IP za mrežno kartico: `interface eth0   static ip_address=192.168.3.10/24`
V `/etc/rc.local` po navodilih print serverju nastavimo IP: `arp -s 192.168.3.1 00:c0:02:16:29:45`
Nato še namestimo tiskalnik: `sudo lpadmin -p tiskalnik -v lpd://192.168.3.1/L1 -E; sudo lpadmin -d tiskalnik`

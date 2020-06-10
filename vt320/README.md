![VT320](https://raw.githubusercontent.com/markostamcar/muzej.si/master/vt320/vt320.jpg)

Terminalski dostop do http://zbirka.muzej.si/
- Node.js modul v direktorju `zbirka` se namesti z `npm install`
- Shell dostop do RPi prek USB RS232 adapterja se omogoči s `systemctl daemon-reload && sudo systemctl enable serial-getty@ttyUSB0.service`
- Na RPi se ustvari nov uporabnik `zbirka` in v njegov `.profile` doda onemogočenje CTRL+C/Z/backslash in samodejni zagon Node.js aplikacije
- V `rc.local` dodan ukaz za izklop varčevanja z energijo za WiFi, saj se je na RPi 3B+ povezava sicer ob daljši neaktivnosti obešala
- Za preprosto posodabljanje Node.js modula z najnovejšo verzijo se vsako jutro ob 5:00 izvede naslednji cronjob: `0 5 * * * pkill -KILL -u zbirka; su zbirka -c "cd /home/zbirka/muzej.si/vt320/zbirka; git pull"`
- Uspesna povezava z VT320 mi je uspela samo z originalnim Digitalovim 25-pin kablom, na katerega se nato prikljuci poljuben 25-to-9 adapter in nanj USB Serial

Viri:
- https://dvdmuckle.xyz/index.php/2016/10/25/hooking-up-a-vt420-terminal-to-a-raspberry-pi/




sudo apt install fswebcam cups graphicsmagick
sudo usermod -a -G video zbirka
sudo lpadmin -p tiskalnik -v lpd://192.168.3.1/L1 -E
sudo lpadmin -d tiskalnik
/etc/rc.local:
arp -s 192.168.3.1 00:c0:02:16:29:45
/etc/dhcpcd.conf:
interface eth0
static ip_address=192.168.3.10/24
.profile:
node muzej.si/vt/320/zbirka/webcam.js &
crontab:
npm install

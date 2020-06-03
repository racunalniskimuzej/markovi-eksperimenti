![VT320](https://raw.githubusercontent.com/markostamcar/muzej.si/master/vt320/vt320.jpg)

Terminalski dostop do http://zbirka.muzej.si/
- Node.js modul v direktorju `zbirka` se namesti z `npm install`
- Shell dostop do RPi prek USB RS232 adapterja se omogoči s `systemctl daemon-reload && sudo systemctl enable serial-getty@ttyUSB0.service`
- Na RPi se ustvari nov uporabnik `zbirka` in v njegov `.profile` doda onemogočenje CTRL+C/Z/backslash in samodejni zagon Node.js aplikacije
- V `rc.local` dodan ukaz za izklop varčevanja z energijo za WiFi, saj se je na RPi 3B+ povezava sicer ob daljši neaktivnosti obešala
- Uspesna povezava z VT320 mi je uspela samo z originalnim Digitalovim 25-pin kablom, na katerega se nato prikljuci poljuben 25-to-9 adapter in nanj USB Serial

Viri:
- https://dvdmuckle.xyz/index.php/2016/10/25/hooking-up-a-vt420-terminal-to-a-raspberry-pi/

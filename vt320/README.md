![VT320](https://raw.githubusercontent.com/markostamcar/muzej.si/master/vt320/vt320.jpg)

Terminalski dostop do https://zbirka.muzej.si/
- Nastavitve na VT320 ponastavimo z `Default` in spremenimo naslednje: `Display: Auto Wrap, Jump Scroll, Host Writable Status Display; Communications: Transmit=19200`, nato izberemo `Save`
- Nastavitve za Paka 3000: `NABOR ZNAKOV: USASCII, TIP TASTATURE: JUGO., ODD.HITROST: 9600, SPR.HITROST: 9600`
- Node.js modul (stestiran na v8/v10) v direktorju `zbirka` se namesti s `sudo apt install graphicsmagick; npm install`, nato izvedi `git checkout *`, saj je bila ena od datotek v `node_modules` spremenjena 
- Shell dostop do RPi prek USB RS232 adapterja se omogoči s `systemctl daemon-reload && sudo systemctl enable serial-getty@ttyUSB0.service`
- Na RPi se ustvari nov uporabnik `zbirka` in v njegov `.profile` doda onemogočenje CTRL+C/Z/backslash in samodejni zagon Node.js aplikacije
- V `rc.local` dodan ukaz za izklop varčevanja z energijo za WiFi, saj se je na RPi 3B+ povezava sicer ob daljši neaktivnosti obešala
- Uspesna povezava z VT320 mi je uspela samo z originalnim Digitalovim 25-pin kablom, na katerega se nato prikljuci poljuben 25-to-9 adapter in nanj USB Serial

Ukaz `fotka` za ASCII art iz webcam, ki ga lahko obiskovalci v zameno za donacijo tudi natisnejo na velikem Fujitsu line printerju :D

- Namestitev paketov za zajem slike iz webcama in tiskanje:
`sudo apt install fswebcam cups; sudo usermod -a -G video zbirka`
- Tiskalnik priklopimo s kompatibilnim USB-to-LPT adapterjem, ki mora podpirati način "bi-directional (PS/2)" in ne samo novejših EPP/ECP
- Namestimo ga s `sudo lpadmin -p tiskalnik -E -v parallel:/dev/usb/lp0; sudo lpadmin -d tiskalnik`

Namestitev paketov za pošiljanje fotke iz Game Boy Camere na email:

- Namestitev komponent, ki jih zahteva Node.js canvas modul: `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`
- Potrebno dodati dostop do serijskih portov: `sudo usermod -a -G dialout zbirka`


Kako do šumnikov:
- VT320 podpira "download" simbolov iz strežnika (Dynamically Redefined Character Set (DRCS) - link do dokumentacije spodaj)
- Posamezne črke so velike 15x12 pikslov - uporabimo perl skripto iz spodnjega gista (za pretvorbo PNG v XPM potrebuje ImageMagick)
- Skripto poženemo s `perl drcsconv.pl sumniki.png` in uporabimo vseh 10 vrstic z enkodiranimi črkami

Viri:
- https://dvdmuckle.xyz/index.php/2016/10/25/hooking-up-a-vt420-terminal-to-a-raspberry-pi/
- https://www.vt100.net/docs/vt320-uu/appendixe.html
- https://www.vt100.net/dec/vt320/soft_characters
- https://gist.github.com/markostamcar/cddbe8d0e6216c26f865e66dbba890e2

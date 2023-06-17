[English-speaking visitors, please click here :)](README-en.md)

![VT320](https://raw.githubusercontent.com/markostamcar/muzej.si/master/vt320/vt320.jpg)

Terminalski dostop do https://zbirka.muzej.si/ + tiskanje ASCII art iz webcam na line printer + pošiljanje fotk iz Game Boy Camere na email:
- VT320: Nastavitve ponastavimo z `Default` in spremenimo naslednje: `Display: Auto Wrap, Jump Scroll, Host Writable Status Display; Communications: Transmit=19200`, nato izberemo `Save`
- Paka 3000: `NABOR ZNAKOV: USASCII, TIP TASTATURE: JUGO., ODD.HITROST: 9600, SPR.HITROST: 9600`
- Uspesna povezava z VT320 mi je uspela samo z originalnim Digitalovim 25-pin kablom, na katerega se nato prikljuci poljuben 25-to-9 adapter in nanj USB Serial
- Line printer Fujitsu priklopimo s kompatibilnim USB-to-LPT adapterjem, ki mora podpirati način "bi-directional (PS/2)" in ne samo novejših EPP/ECP
- Prek USB huba priključimo še Arduino Nano za Game Boy ter USB WebCam za ASCII art

Postavitev Node.js aplikacije (stestirana na v8/v10) iz direktorija `zbirka` na Raspberry Pi:
1. ```sudo adduser zbirka```, ```sudo apt install git```, nato kot ```su zbirka```:
```
cd ~ && git clone https://github.com/markostamcar/muzej.si
cp muzej.si/vt320/.profile .
```
V ```muzej.si/vt320/zbirka/utils.js``` vnesti podatke za SMTP.

2. Nazaj kot user ```pi```:

```
sudo apt install graphicsmagick fswebcam cups build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
sudo cp /home/zbirka/muzej.si/vt320/*.service /etc/systemd/system
sudo cp /home/zbirka/muzej.si/vt320/10-local.rules /etc/udev/rules.d
sudo cp /home/zbirka/muzej.si/vt320/rc.local /etc/rc.local
sudo lpadmin -p tiskalnik -E -v parallel:/dev/usb/lp0; sudo lpadmin -d tiskalnik
sudo usermod -a -G video zbirka
sudo usermod -a -G dialout zbirka
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs npm
```

3. Zopet ```su zbirka```:
```
cd ~/muzej.si/vt320/zbirka
npm install
git checkout node_modules/readline-sync/lib/readline-sync.js
```

4. Spet kot user ```pi```: ```sudo reboot```, nato:
```
sudo systemctl enable serial-getty@vt320.service && sudo systemctl start serial-getty@vt320.service
sudo systemctl enable serial-getty@paka3000.service && sudo systemctl start serial-getty@paka3000.service
```

5. Dodatni ukazi v Node.js aplikaciji:
- `izhod` (samo v SSH clientu, ne pa tudi na pravih terminalih)
- `print <url>`: izpiše ASCII art iz specificiranega URLja, pri čemer `https://` izpustimo; primer: `print pastebin.com/raw/VBf8w80a`

Kako sem usposobil šumnike:
- VT320 podpira "download" simbolov iz strežnika (Dynamically Redefined Character Set (DRCS) - link do dokumentacije spodaj)
- Posamezne črke so velike 15x12 pikslov - uporabimo perl skripto iz spodnjega gista (za pretvorbo PNG v XPM potrebuje ImageMagick)
- Skripto poženemo s `perl drcsconv.pl sumniki.png` in uporabimo vseh 10 vrstic z enkodiranimi črkami
- Paka 3000 pa jih že ima vgrajene v kodni tabeli "S"

Viri:
- https://dvdmuckle.xyz/index.php/2016/10/25/hooking-up-a-vt420-terminal-to-a-raspberry-pi/
- https://www.vt100.net/docs/vt320-uu/appendixe.html
- https://www.vt100.net/dec/vt320/soft_characters
- https://gist.github.com/markostamcar/cddbe8d0e6216c26f865e66dbba890e2
- https://github.com/mofosyne/arduino-gameboy-printer-emulator

![VT320](https://raw.githubusercontent.com/markostamcar/muzej.si/master/vt320/vt320.jpg)

Terminal access to https://zbirka.muzej.si/#english + ASCII art from webcam to line printer + send your Game Boy Camera photos to email:
- VT320: Reset settings to `Default`, then change the following: `Display: Auto Wrap, Jump Scroll, Host Writable Status Display; Communications: Transmit=19200`, then select `Save`
- Paka 3000: `NABOR ZNAKOV: USASCII, TIP TASTATURE: JUGO., ODD.HITROST: 9600, SPR.HITROST: 9600`
- I was only able to connect VT320 using the original Digital 25-pin cable, then using a 25-to-9 adapter to connect to USB Serial
- The Fujitsu line printer Fujitsu can be used with a compatible USB-to-LPT adapter which must support the  "bi-directional (PS/2)" protocol and not just the newer EPP/ECP
- Connect the Game Boy's Arduino Nano and USB WebCam (for ASCII art) using a USB hub

Setup the Node.js program (tested on v8/v10) from the `zbirka` folder on a Raspberry Pi:
1. ```sudo adduser zbirka```, then as ```su zbirka```:
```
cd ~ && git clone https://github.com/markostamcar/muzej.si
cp muzej.si/vt320/.profile .
```
In ```muzej.si/vt320/zbirka/gb.js``` set SMTP credentials.

2. Back as user ```pi```:

```
sudo apt install graphicsmagick fswebcam cups build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
sudo cp /home/zbirka/muzej.si/vt320/*.service /etc/systemd/system
sudo cp /home/zbirka/muzej.si/vt320/10-local.rules /etc/udev/rules.d
sudo cp /home/zbirka/muzej.si/vt320/rc.local /etc/rc.local
sudo lpadmin -p tiskalnik -E -v parallel:/dev/usb/lp0; sudo lpadmin -d tiskalnik
sudo usermod -a -G video zbirka
sudo usermod -a -G dialout zbirka
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs
```

3. Again as ```su zbirka```:
```
cd ~/muzej.si/vt320/zbirka
npm install
git checkout node_modules/readline-sync/lib/readline-sync.js
```

4. Then back as user ```pi```: ```sudo reboot```, then:
```
sudo systemctl enable serial-getty@vt320.service && sudo systemctl start serial-getty@vt320.service
sudo systemctl enable serial-getty@paka3000.service && sudo systemctl start serial-getty@paka3000.service
```

5. Additional commands in the Node.js program:
- `izhod` (terminates the program; only works on SSH clients and not on real terminal hardware)
- `print <url>`: displays ASCII art from the specified URL, the `https://` prefix should be omitted; e.g.: `print pastebin.com/raw/VBf8w80a`

How I got the Slovenian characters working:
- VT320 supports the Dynamically Redefined Character Set (DRCS) protocol to download new character glyphs from server - see link below)
- Each glyph is 15x12 pixels in size - use the script from gist below to convert them (to convert from PNG to XPM ImageMagick is needed)
- Run the script using `perl drcsconv.pl sumniki.png` and copy all 10 lines of terminal commands
- Paka 3000 already has them implemented in the "S" character set

Sources:
- https://dvdmuckle.xyz/index.php/2016/10/25/hooking-up-a-vt420-terminal-to-a-raspberry-pi/
- https://www.vt100.net/docs/vt320-uu/appendixe.html
- https://www.vt100.net/dec/vt320/soft_characters
- https://gist.github.com/markostamcar/cddbe8d0e6216c26f865e66dbba890e2
- https://github.com/mofosyne/arduino-gameboy-printer-emulator

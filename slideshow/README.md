![Slideshow](https://raw.githubusercontent.com/markostamcar/muzej.si/master/slideshow/slideshow.jpg)

## Vse fotografije so last Društva računalniški muzej.

Namestitev barvnih emojijev: `sudo apt install fonts-noto-color-emoji`

Avtomatsko predvajanje na RPi 4 (dual screen):

`/home/pi/.config/lxsession/LXDE-pi/autostart`: (ustvari mape in datoteko, če še ne obstaja)
```
@xset s off
@xset -dpms
@xset s noblank
@chromium-browser --window-position=0,0 --kiosk --app=https://zbirka.muzej.si/slideshow/index.htm
@chromium-browser --window-position=1920,0 --kiosk --user-data-dir=/tmp --app=https://zbirka.muzej.si/slideshow/index.htm
```

Izklop prikaza miškinega kazalčka:

`/etc/lightdm/lightdm.conf`:
```
xserver-command=X -nocursor
```

Reden reboot ob 4:00 ponoči (Chromeu občasno zmanjka RAMa):

`crontab -e`:
```
0 4 * * * sudo reboot
```

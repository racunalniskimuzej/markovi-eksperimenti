![Slideshow](https://raw.githubusercontent.com/markostamcar/muzej.si/master/slideshow/slideshow.jpg)

Namestitev barvnih emojijev in orodja za skrivanje miškinega kazalčka: `sudo apt install fonts-noto-color-emoji unclutter`

Avtomatsko predvajanje na RPi 4 (dual screen):

`/home/pi/.config/lxsession/LXDE-pi/autostart`: (ustvari mape in datoteko, če še ne obstaja)
```
@xset s off
@xset -dpms
@xset s noblank
@unclutter -idle 0
@chromium-browser --window-position=0,0 --kiosk --app=https://zbirka.muzej.si/slideshow/index.htm
@chromium-browser --window-position=1920,0 --kiosk --user-data-dir=/tmp --app=https://zbirka.muzej.si/slideshow/index.htm
```

Dodatni izklop prikaza miškinega kazalčka:

`/etc/lightdm/lightdm.conf`:
```
xserver-command=X -nocursor
```

# Vse fotografije so last Društva računalniški muzej.

Za namestitev barvnih emojijev: `sudo apt install fonts-noto-color-emoji`

Za avtomatsko predvajanje na RPi 3B+:

`/home/pi/.config/lxsession/LXDE-pi/autostart`:
```
@xset s off
@xset -dpms
@xset s noblank
@chromium --kiosk --app=https://zbirka.muzej.si/slideshow/index.htm
```

Za avtomatsko predvajanje na RPi 4 (dual screen):

`/home/pi/.config/lxsession/LXDE-pi/autostart`:
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

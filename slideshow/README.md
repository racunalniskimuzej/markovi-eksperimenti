# Vse fotografije so last Društva računalniški muzej.

Za avtomatsko predvajanje na RPi 3B+:

`/home/pi/.config/lxsession/LXDE-pi/autostart`:
```
@xset s off
@xset -dpms
@xset s noblank
@chromium --kiosk --app=https://zbirka.muzej.si/slideshow/
```

Za avtomatsko predvajanje na RPi 4 (dual screen):

`/home/pi/.config/lxsession/LXDE-pi/autostart`:
```
@xset s off
@xset -dpms
@xset s noblank
@chromium-browser --window-position=0,0 --kiosk --app=https://zbirka.muzej.si/slideshow/
@chromium-browser --window-position=1920,0 --kiosk --user-data-dir=/tmp --app=https://zbirka.muzej.si/slideshow/
```

Izklop prikaza miškinega kazalčka:
`/etc/lightdm/lightdm.conf`:
```
xserver-command = X -nocursor
```

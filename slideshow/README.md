# Vse fotografije so last Društva računalniški muzej

Za avtomatsko predvajanje na RPi 3B+:

`/home/pi/.config/lxsession/LXDE-pi/autostart`:
```
@chromium --kiosk https://esh01.stamcar.com/static/fb/
```

Za avtomatsko predvajanje na RPi 4 (dual screen):

`/home/pi/.config/lxsession/LXDE-pi/autostart`:
```
@chromium-browser --window-position=0,0 --kiosk https://esh01.stamcar.com/static/fb/
@chromium-browser --window-position=1920,0 --kiosk --user-data-dir=/tmp https://esh01.stamcar.com/static/fb/
```

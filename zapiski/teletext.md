# Teletext Twitter na Raspberry Pi

- Z najnovejšimi različicami OS so težave, zadeva preverjeno dela na 2021-05-07-raspios-buster-armhf-full.img
- Prek raspi-config vklopimo kompozitni izhod (opomba: AV kabel ima zaradi drugačnega pinouta sliko na rdečem cinch)
- V /boot/config.txt vklopimo PAL kompozitni izhod
- Preprečimo, da bi zaslon šel v spanje: `/home/pi/.config/lxsession/LXDE-pi/autostart`: (ustvari mape in datoteko, če še ne obstaja)
```
@xset s off
@xset -dpms
@xset s noblank
```
- Namestimo https://github.com/peterkvt80/vbit2/wiki po navodilih - ko nas vpraša, namestimo service Teefax in pod Options vklopimo samodeni zagon
- `git clone https://github.com/mpentler/teletext-twitter`
- 

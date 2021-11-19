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
- V `/home/pi/.teletext-services/Teefax` pobrišemo vse .tti datoteke in po želji popravimo `vbit.conf`
- `git clone https://github.com/mpentler/teletext-twitter`
- `pip3 install python-twitter`
- `config.py-default` preimenujemo v `config.py` in v njem nastavimo API keys za Twitter, tti_path nastavimo na `/home/pi/.teletext-services/Teefax/`, page_number pa na 100
- Cronjob: `0 * * * * cd /home/pi/teletext-twitter && /usr/bin/python3 /home/pi/teletext-twitter/teletext-twitter -m user -q muzej -c 10 -n`

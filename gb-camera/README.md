![Game Boy Camera](https://raw.githubusercontent.com/markostamcar/muzej.si/master/gb-camera/gb1.jpg) ![Game Boy Camera](https://raw.githubusercontent.com/markostamcar/muzej.si/master/gb-camera/gb2.jpg)

Pošiljanje fotk iz Game Boy camere na e-mail

- `DMG_battery_cover.stl`: 3D model pokrovčka za baterijo, s pomočjo katerega lahko Arduino Nano zapakiramo v notranjost Game Boya (model iz https://www.thingiverse.com/thing:104919)
- `DMG_link_port_connector.stl`: 3D model konektorja za originalni Game Boy DMG-01, na katerega s 4 moškimi jumper žičkami "dupont" priključimo Arduino Nano
- `gb-upload.php`: PHP koda, ki prejme in servira fotke iz `gb-upload.js`
- `gbp_emulator_v2.zip`: firmware za Arduino Nano iz https://github.com/mofosyne/arduino-gameboy-printer-emulator, ki zajame fotko, ki jo damo tiskati na Game Boy Cameri
- Funkcionalnost za zajem in pošiljanje fotke po e-mailu/upload pa je bila dodana v projekt https://github.com/markostamcar/muzej.si/tree/master/vt320

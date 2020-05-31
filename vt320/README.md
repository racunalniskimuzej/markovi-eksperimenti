Terminalski dostop do http://zbirka.muzej.si/
- Node.js modul v direktorju "zbirka" se namesti z "npm install"
- Shell dostop do RPi prek USB RS232 adapterja se omogoči z "systemctl daemon-reload && sudo systemctl enable serial-getty@ttyUSB0.service"
- Na RPi se ustvari nov uporabnik in v .profile doda onemogočenje CTRL+C/Z/backslash in samodejni zagon Node.js aplikacije

Viri:
- https://dvdmuckle.xyz/index.php/2016/10/25/hooking-up-a-vt420-terminal-to-a-raspberry-pi/

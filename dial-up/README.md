![RacMuz ISP](https://raw.githubusercontent.com/markostamcar/muzej.si/master/dial-up/modem.jpg)

Z dvema zunanjima U.S. Robotics modemoma (gonilnik `mdm3com.inf`) simuliran klasičen dial-up internetni dostop - kot videno v oddaji Izodrom
- Dial-up Server se v Windows 95 namesti z `dun14-95.exe`
- V računalnik, ki bo igral vlogo ISPja, damo mrežno kartico `RTL8139` (gonilnik za WIN95A priložen)
- V registru gremo v `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Class\Modem\0000\Monitor` in vrednost `2` nastavimo na `ATA<cr>`
- Za posredovanje modemskega prometa prek LAN namestimo http://download.kerio.com/dwn/wrp/kerio-wrp-425-en-win.exe ter `com32upd.exe`
- Zaženemo WinRoute, se prijavimo z OK in izberemo Settings -> Interface Table, kjer najprej dvokliknemo mrežno kartico in se prepričamo, da je 1. kvadratek obkljukan, 2. pa ne - nato dvokliknemo še RAS, kjer ne sme biti obkljukan noben kvadratek.
- Prek Start -> Run izvedemo ukaz `C:\WINDOWS\RUNDLL32.EXE RNASERV.DLL,CallerAccess`, kliknemo Server Type... in ga nastavimo na `PPP: Windows 95, Windows NT 3.5, Internet`
- Sedaj nastavimo računalnik, ki bo igral vlogo odjemalca: v Control Panel -> Modems poskrbimo, da  v Properties -> Connection od našega modema opcija "Wait for dial tone before dialing" ne bo obkljukana, nato ustvarimo novo dial-up povezavo (telefonska številka ni pomembna).
- Za vzpostavitev zveze na PCju-ISPju v oknu "Dial-Up Server" izberemo opcijo "Allow caller access", a je še ne potrdimo z Apply
- Nato na PCju-odjemalcu na dial-up povezavi kliknemo Connect, počakamo da se zaključi tonsko izbiranje tel. št., nato pa na ISPju kliknemo Apply
- Če je šlo vse po sreči, se je odjemalec zdaj povezal na ISP in lahko z dial-up hitrostjo surfa po internetu (zaradi starega OS in brskalnika večina sodobnih strani, sploh pa tistih, ki uporabljajo https:// (večina), ne bo delovala)

Viri:
- https://www.vogons.org/viewtopic.php?t=68514
- https://www.facebook.com/watch/?v=205453160718972

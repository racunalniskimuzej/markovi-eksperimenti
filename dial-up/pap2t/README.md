![PAP2T](https://raw.githubusercontent.com/markostamcar/muzej.si/master/dial-up/pap2t/pap2t.jpg)

Adapted from https://dogemicrosystems.ca/wiki/Dial_up_server and https://gekk.info/articles/ata-config.html for use with USRobotics USR5637 USB modem

1. Fresh Raspberry Pi OS install, change password, do `apt update && apt upgrade`
2. Set static IP on PAP2T (connect a phone and use DTMF commands): IP `192.168.51.2`, netmask `255.255.255.0`
3. Set static eth0 on RPi: `/etc/dhcpcd.conf`:
```
interface eth0
static ip_address=192.168.51.1/24
```
4. PAP2T Line 1 & 2 (under advanced view!): Echo Canc Enable: No, Echo Canc Adapt Enable: No, Echo Supp Enable: No, Preferred Codec: G711u, Use Pref Codec Only: Yes, Network Jitter Level: Low, Jitter Buffer Adjustment: Disable, FAX CED Detect Enable: no, FAX CNG Detect Enable: no, FAX Process NSE: no

### a) Without Asterisk (to keep it simple - RECOMMENDED)
5. PAP2T Line 1: Make Call Without Reg: yes, Ans Call Without Reg: yes, User ID: `100`, Dialplan: `(*xx|[3469]11|0|00|[2-9]xxxxxx|1xxx[2-9]xxxxxxS0|xxxxxxxxxxxx.|<1337:101>S0<:@127.0.0.1:5061>|)`
6. PAP2T Line 2: Make Call Without Reg: yes, Ans Call Without Reg: yes, User ID: `101`, Dialplan: `(*xx|[3469]11|0|00|[2-9]xxxxxx|1xxx[2-9]xxxxxxS0|xxxxxxxxxxxx.|<1337:100>S0<:@127.0.0.1:5060>|)`
7. Continue with instructions for The Dial-in Server at https://dogemicrosystems.ca/wiki/Dial_up_server - replace `ttyUSB0` with `ttyACM0` and `eth0` with `wlan0`!

### b) With Asterisk
5. PAP2T Line 1: Proxy: `192.168.51.1`, User ID: `pap2t-ispmodem`, Password: `password`, Use Auth ID: yes, Auth ID: `ap2t-ispmodem`
6. PAP2T Line 2: Proxy: `192.168.51.1`, User ID: `pap2t-client`, Password: `password`, Use Auth ID: yes, Auth ID: `pap2t-client`
7. Continue with instructions for Asterisk Setup & The Dial-in Server at https://dogemicrosystems.ca/wiki/Dial_up_server - replace `ttyUSB0` with `ttyACM0` and `eth0` with `wlan0`!

### a) & b)
8. In `/etc/mgetty/login.config` set `/AutoPPP/ -	a_ppp	/usr/sbin/pppd noauth -chap debug` so any username/password can be used
9. In `/etc/mgetty/mgetty.config` set `rings  1` so the connection gets setup faster
10. On dial-up client put `#` at the end of the phone number (`1337#`) - this will reduce the number of rings before the connection is made
11. For Windows 95 clients, manually set DNS to 8.8.8.8 to fix the very slow first website load after the dial-up connection is made

Adapted from https://dogemicrosystems.ca/wiki/Dial_up_server for use with USRobotics USR5637 USB modem

1. Fresh Raspberry Pi OS install, change password, do `apt update && apt upgrade`
2. Set static IP on PAP2T: IP `192.168.51.2`, netmask `255.255.255.0`
3. Set static eth0 on RPi: `/etc/dhcpcd.conf`:
```
interface eth0
static ip_address=192.168.51.1/24
```
4. PAP2T Line 1 & 2: Echo Canc Enable: No, Echo Canc Adapt Enable: No, Echo Supp Enable: No, Preferred Codec: G711u, Use Pref Codec Only: Yes, Network Jitter Level: Low, Jitter Buffer Adjustment: Disable
5. PAP2T Line 1: Proxy: 192.168.51.1, User ID: pap2t-ispmodem, Password: password, Use Auth ID: yes, Auth ID: pap2t-ispmodem
6. PAP2T Line 2: Proxy: 192.168.51.1, User ID: pap2t-client, Password: password, Use Auth ID: yes, Auth ID: pap2t-client
7. Continue with instructions for Asterisk Setup at https://dogemicrosystems.ca/wiki/Dial_up_server - replace `ttyUSB0` with `ttyACM0` and `eth0` with `wlan0`!
8. In `/etc/mgetty/mgetty.config` set: `rings  1` so the connection gets setup faster
9. In `/etc/mgetty/login.config` set: `/AutoPPP/ -	a_ppp	/usr/sbin/pppd noauth -chap debug` so any username/password can be used

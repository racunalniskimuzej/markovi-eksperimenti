1. Fresh Rpi install
2. Set static IP on pap2t: IP 192.168.51.2, netmask 255.255.255.0
3. Set static eth0 on Rpi: /etc/dhcpcd.conf:

interface eth0
static ip_address=192.168.51.1/24

4. pap2t: 3x echo cancallation off, only prefered codec on, jitter low, adjust off
5.   [UI_04.gif] Proxy: 1  [UI_04.gif] Display Name: _______________ User ID: pap2t-client___
   [UI_04.gif] Password: *************__ Use Auth ID: [yes]
   [UI_04.gif] Auth ID: pap2t-client___
92.168.51.1___ 
6.     [UI_04.gif] Display Name: _______________ User ID: pap2t-client___
   [UI_04.gif] Password: *************__ Use Auth ID: [yes]
   [UI_04.gif] Auth ID: pap2t-client___

7. All instructions from https://dogemicrosystems.ca/wiki/Dial_up_server - iptables wlan0 instead of eth0!

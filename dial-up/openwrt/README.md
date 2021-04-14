| File | Copy to | Changelog |
|-|-|-|
| 20-modem | /etc/hotplug.d/usb/20-modem | Script to start mgetty after USB modem detected |
| asterisk | /etc/config/asterisk | Enable asterisk service |
| extensions.conf | /etc/asterisk/extensions.conf | Asterisk config for direct internal calling between the two analog ports |
| lantiq.conf | /etc/asterisk/lantiq.conf | lantiq.conf: set per_channel_context to on, disable echo cancellation, set jitter handling to data, set codec |
| login.config | /opt/etc/mgetty/login.config | enable ppp for mgetty |
| mgetty.config | /opt/etc/mgetty/mgetty.config | mgetty config from [Doge Microsystems](https://dogemicrosystems.ca/wiki/Dial_up_server) |
| network | /etc/config/network | NOTE: this will change LAN IP to 192.168.99.1! |
| options | /etc/ppp/options | ppp config from [Doge Microsystems](https://dogemicrosystems.ca/wiki/Dial_up_server) |
| options.ttyACM0 | /etc/ppp/options.ttyACM0 | ppp config from [Doge Microsystems](https://dogemicrosystems.ca/wiki/Dial_up_server) |
| rc.local | /etc/rc.local | iptables config from [Doge Microsystems](https://dogemicrosystems.ca/wiki/Dial_up_server) |
| vmmc | /etc/init.d/vmmc | fix permissions for /dev/vmmc* |
| wireless | /etc/config/wireless | set SSID & password to use WiFi in client mode |

# Dial-up ISP-in-a-box using OpenWrt on o2 Box 6431

[![o2 Box 6431](https://raw.githubusercontent.com/markostamcar/muzej.si/master/dial-up/openwrt/o2box-thumb.jpg)](https://raw.githubusercontent.com/markostamcar/muzej.si/master/dial-up/openwrt/o2box.jpg)

### Known issues (as of 14. April 2021)
- The modem connection quality is extermely poor - just 2400 bps :( Ping from OpenWrt to client machine works, but that's about it
- I have tried different settings and codecs in lantiq.conf but was unable to get any improvements

### Shopping list
- o2 Box 6431 (Arcadyan VGV7510KW22) - it has [good OpenWrt support](https://openwrt.org/toh/arcadyan/vgv7510kw22), 2 analog phone ports, WLAN for internet access and USB 2.0 port
- 56k modem [USRobotics USR5637](https://www.usr.com/products/56k-dialup-modem/usr5637/)

### OpenWrt build
- For me, it worked great on [WSL2](https://openwrt.org/docs/guide-developer/build-system/wsl) on Windows 10
```
git clone https://github.com/openwrt/openwrt.git
./scripts/feeds update -a
./scripts/feeds install -a

- Copy mgetty folder from this repo to feeds/packages/utils

./scripts/feeds update packages
./scripts/feeds install mgetty

make menuconfig
Target System: Lantiq
Subtarget: XRX200
Target Profile:  o2 Box 6431 NOR (Arcadyan VGV7510KW22 NOR)

Kernel modules: USB Support: <*> kmod-usb-acm, <*> kmod-usb2
Network: Telephony: <*> asterisk: <*> asterisk-app-confbridge, <*> asterisk-codec-a-mu, <*> asterisk-codec-alaw, <*> asterisk-codec-resample, <*> asterisk-codec-ulaw
Network: Telephony Lantiq: <*> asterisk-chan-lantiq
Utilities: Telephony: <*> mgetty

- Exit and Save
make -j4
```

### OpenWrt flash
- Image will be too big for brnboot, so [switching to uBoot is needed](https://forum.openwrt.org/t/installing-lede-u-boot-via-brnboot-web-interface-without-rs232/9857/6)

### OpenWrt config
- Set root password using `passwd`!
- Copy configuration files to specified directories:

| File | Copy to | Changelog |
|-|-|-|
| 20-modem | /etc/hotplug.d/usb/20-modem | Script to start mgetty after USB modem detected |
| asterisk | /etc/config/asterisk | Enable asterisk service |
| extensions.conf | /etc/asterisk/extensions.conf | Asterisk config for direct internal calling between the two analog ports |
| lantiq.conf | /etc/asterisk/lantiq.conf | set per_channel_context to on, disable echo cancellation, set jitter handling to data, set codec |
| login.config | /opt/etc/mgetty/login.config | enable ppp for mgetty |
| mgetty.config | /opt/etc/mgetty/mgetty.config | mgetty config from [Doge Microsystems](https://dogemicrosystems.ca/wiki/Dial_up_server) |
| network | /etc/config/network | NOTE: this will change LAN IP to 192.168.99.1! |
| options | /etc/ppp/options | ppp config from [Doge Microsystems](https://dogemicrosystems.ca/wiki/Dial_up_server) |
| options.ttyACM0 | /etc/ppp/options.ttyACM0 | ppp config from [Doge Microsystems](https://dogemicrosystems.ca/wiki/Dial_up_server) |
| rc.local | /etc/rc.local | iptables config from [Doge Microsystems](https://dogemicrosystems.ca/wiki/Dial_up_server) |
| vmmc | /etc/init.d/vmmc | permissions fix for /dev/vmmc*; NOTE: Make sure the new vmmc script has +x permission! |
| wireless | /etc/config/wireless | set SSID & password to use WiFi in client mode |

- `reboot`

### Usage
- After reboot, all services will be started and you will be able to connect a client modem and establish a connection (phone number `1001`)

# Dial-up ISP-in-a-box using OpenWrt on o2 Box 6431

[![o2 Box 6431](https://raw.githubusercontent.com/markostamcar/muzej.si/master/dial-up/openwrt/o2box-thumb.jpg)](https://raw.githubusercontent.com/markostamcar/muzej.si/master/dial-up/openwrt/o2box.jpg)

Shopping list
- o2 Box 6431 (Arcadyan VGV7510KW22) - it has [good OpenWrt support](https://openwrt.org/toh/arcadyan/vgv7510kw22), 2 analog phone ports, WLAN for internet access and USB 2.0 port
- 56k modem [USRobotics USR5637](https://www.usr.com/products/56k-dialup-modem/usr5637/)


OpenWrt build
```
git clone https://github.com/openwrt/openwrt.git
./scripts/feeds update -a
./scripts/feeds install -a

Copy muzej.si/dial-up/openwrt/mgetty to feeds/packages/utils

./scripts/feeds update packages
./scripts/feeds install mgetty

make menuconfig
Target System: Lantiq
Subtarget: XRX200
Target Profile:  o2 Box 6431 NOR (Arcadyan VGV7510KW22 NOR)

Kernel modules: USB Support: <*> kmod-usb-acm, <*> kmod-usb2
Network: Telephony: <*> asterisk: <*> asterisk-codec-a-mu, <*> asterisk-codec-alaw, <*> asterisk-codec-resample, <*> asterisk-codec-ulaw
Network: Telephony Lantiq: <*> asterisk-chan-lantiq
Utilities: Telephony: <*> mgetty

Exit and Save
make -j4
```

OpenWrt flash
- Image will be too big for brnboot, so [switching to uBoot is needed](https://forum.openwrt.org/t/installing-lede-u-boot-via-brnboot-web-interface-without-rs232/9857/6)

CONFIG
Set root password using passwd!

Copy from muzej.si/dial-up/openwrt/ to:
(See muzej.si/dial-up/openwrt/README.md for changes list)

/etc/init.d/vmmc
/etc/asterisk/lantiq.conf
/etc/asterisk/extensions.conf
/etc/hotplug.d/usb/20-modem
/etc/config/network (NOTE: this will change LAN IP to 192.168.99.1!)
/etc/config/wireless (set SSID & password!)
/etc/config/asterisk
/opt/etc/mgetty/mgetty.config
/opt/etc/mgetty/login.config
/etc/ppp/options
/etc/ppp/options.ttyACM0
/etc/rc.local

reboot!

```

# Work in progress. More to follow!

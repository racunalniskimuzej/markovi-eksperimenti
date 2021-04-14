# Dial-up ISP-in-a-box using OpenWrt on Arcadyan VGV7510KW22 (o2 Box 6431)

- o2 Box 6431 offers everything we need: Good OpenWrt support, 2 analog phone connections, WLAN for internet access and USB 2.0 port for 56k modem (USRobotics USR5637)

```
BUILD

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
Network: Telephony: <*> asterisk, Telephony Lantiq: <*> asterisk-chan-lantiq
Utilities: Telephony: <*> mgetty

Exit and Save
make -j4

FLASH

Image will be too big for brnboot, so switching to uBoot is needed:
https://forum.openwrt.org/t/installing-lede-u-boot-via-brnboot-web-interface-without-rs232/9857/6

CONFIG
Set root password using passwd!

Copy from muzej.si/dial-up/openwrt/ to:
(See muzej.si/dial-up/openwrt/README.md for changes list)

/etc/init.d/vmmc
/etc/asterisk/lantiq.conf
/etc/asterisk/extensions.conf
/etc/hotplug.d/usb/20-modem
/etc/config/network
/etc/config/wireless (set SSID & password!)
/etc/config/asterisk
/etc/mgetty/mgetty.config

reboot!

```

# Work in progress. More to follow!

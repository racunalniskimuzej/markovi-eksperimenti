# Dial-up ISP-in-a-box using OpenWrt on Arcadyan VGV7510KW22 (o2 Box 6431)

- o2 Box 6431 offers everything we need: Good OpenWrt support, 2 analog phone connections, WLAN for internet access and USB 2.0 port for 56k modem (USRobotics USR5637)

```
BUILD

git clone https://github.com/openwrt/openwrt.git
./scripts/feeds update -a
./scripts/feeds install -a

Copy muzej.si/dial-up/mgetty to feeds/packages/utils
./scripts/feeds update packages
./scripts/feeds install mgetty

make menuconfig
Target System: Lantiq
Subtarget: XRX200
Target Profile:  o2 Box 6431 BRN (Arcadyan VGV7510KW22 BRN)

Kernel modules: USB Support: <*> kmod-usb-acm, <*> kmod-usb2
Network: Telephony: <*> asterisk, Telephony Lantiq: <*> asterisk-chan-lantiq
Utilities: Telephony: <*> mgetty

Exit and Save
make -j4

FLASH

Set your computer at 192.168.1.2
Connect LAN1 with PC
Set PC LAN IP to 192.168.1.2
Turn o2 Box off, hold reset button and turn on, wait for red power LED
Visit 192.168.1.1, upload target "firmware", wait a few minutes (weird character output is OK)
```

# Work in progress. More to follow!

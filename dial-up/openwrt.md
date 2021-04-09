# Dial-up ISP-in-a-box using OpenWrt on Arcadyan VGV7510KW22 (o2 Box 6431)

- o2 Box 6431 offers everything we need: Good OpenWrt support, 2 analog phone connections, WLAN for internet access and USB 2.0 port for 56k modem

```
git clone https://github.com/openwrt/openwrt.git
./scripts/feeds update -a
./scripts/feeds install -a

Copy mgetty to feeds/packages/utils
./scripts/feeds update packages
./scripts/feeds install mgetty

make menuconfig
```

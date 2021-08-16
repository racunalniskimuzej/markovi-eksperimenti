# Easy 2 phone internal calling including music playback on o2 Box 6431

1. From https://firmware-selector.openwrt.org/ flash latest SNAPSHOT for o2 Box 6431 NOR using `sysupgrade -n`
2. Setup internet connection (easiest to set LAN port to DHCP in `/etc/config/network` and connect to Win 10 ICS)
3. `opkg update && opkg install asterisk-chan-lantiq asterisk-app-confbridge asterisk-codec-a-mu asterisk-codec-alaw asterisk-codec-resample asterisk-codec-ulaw asterisk-format-pcm`
4. In `/etc/init.d/vmmc` change `664` to `777`
5. `/etc/asterisk/lantiq.conf`: Uncomment and set `per_channel_context = on`
6. `/etc/asterisk/extensions.conf`:

```
[lantiq1]
exten => 2468,1,Dial(TAPI/2,30,t)
exten => 1337,1,Playback(leekspin)

[lantiq2]
exten => 1357,1,Dial(TAPI/1,30,t)
exten => 1337,1,Playback(nevergonna)
```

7. Download sounds to `/usr/share/asterisk/sounds` and rename to leekspin.ulaw & nevergonna.ulaw
8. Set `option enabled '1'` in `/etc/config/asterisk`, then `/etc/init.d/asterisk enable`
9. `reboot`

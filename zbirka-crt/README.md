![zbirka.muzej.si](https://raw.githubusercontent.com/markostamcar/muzej.si/master/zbirka-crt/zbirka.jpg)

Forked from https://github.com/andersevenrud/retro-css-shell-demo and changed:

- amber CRT instead of green
- pressing enter should show the prompt again and not just move to a new line
- removed the Monofonto font as its license doesn't allow for free web embedding
- fixed support for mobile devices - soft keyboards do not send key events (only for enter button)
- on some mobile devices the first typed word is capitalized, so made commands case insensitive
- implemented support for AJAX commands so we can query our museum inventory API
- added recall of last command using cursor up
- removed fuzzy CRT animations as they consume lots of CPU and are distracting
- added deep linking support
- fix for iOS mobile browsers: soft keyboard did not show on some iOS versions
- made background much darker
- font replaced with public domain GlassTTY VT220, source: https://github.com/svofski/glasstty

To deploy:
- (just once) `npm install`
- `npm run build`
- use html/js/css from `dist`

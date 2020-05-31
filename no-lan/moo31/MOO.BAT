ECHO OFF
CLS
if %1X==X ECHO Loading the MOO menu "MAINMENU" . . .
if not %1X==X ECHO Loading the MOO menu "%1" . . .
SET MOO=
MOO1  1 0 %1
IF ERRORLEVEL=3 MOO$%MOO%

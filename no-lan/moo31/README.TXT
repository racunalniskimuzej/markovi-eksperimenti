1.  Introduction to the MOO 3.1 Menu System

    MOO is a menu system to make it easier to launch programs.
There's "MOO for DOS" and "MOO for Windows."  Both use the
same menus and can run the same programs.  So you can use MOO
if you use DOS -- or Windows -- or if you use both and want
to unify your worlds.


2.  Installing MOO for the First Time

    If you are upgrading from a previous version of MOO, skip
this section and go to section 3.

    Create a directory for MOO and copy the MOO files into it.
If your directory will be called "moo" and the MOO 3.1 files
are in drive A, then you'd enter these commands from the DOS
prompt:

  md \moo
  cd \moo
  copy a:*.*

Later on, you may want to erase files that you don't use (e.g.,
the sample MOO menus).


3.  Upgrading from Previous Versions of MOO

    First make a backup of your MOO directory, just in case you
have trouble with the new version.

    Then erase the old MOO program/help files.  You can enter
these commands (assuming that your MOO directory is called
"moo"):

  cd \moo
  erase moo*.*
  erase makemenu.exe
  erase litenet.bat

    Then copy the new MOO program/help files.  You can enter
these commands (assuming that you are copying the new files
from drive A):

  cd \moo
  copy a:moo*.*

Your old MOO menus should work with the new MOO.


4.  How to Start MOO

    If you put the MOO directory on your path, then you'll be
able to start MOO for DOS anywhere by just typing "MOO" and
hitting ENTER.  Otherwise, you'll have to enter these two
commands:

  cd \moo
  moo

You can put these two lines in your AUTOEXEC.BAT file if you
want MOO to start up whenever you turn on your computer.

    To start MOO for Windows, double-click on MOOW.EXE in the
Windows File Manager -- or install MOOW.EXE in the Windows
Program Manager and then double-click on the milk-carton icon.

    Both MOO formats have on-line documentation.  Just pick
"Help" from the menu bar.


5.  List of MOO 3.1 Files

    MOO for DOS has these program/help files: MOO.BAT,
MOO1.EXE, MOO2.BAT, MOO.DOC, MOO-ED.DOC, MOO-LITE.DOC,
MOO-FULL.BAT, MOO-LITE.BAT, MOO-NET.BAT.

    MOO for Windows has these program/help files: MOOW.EXE,
MOOWEDIT.EXE, MOOW.HLP, MOOWEDIT.HLP.

    There are two sample menus (MAINMENU.MOO and SAMPLE.MOO)
and two other files (FREERAM.COM and README.TXT).


6.  Version 3.1

    MOO 3.1 basically fixes a few bugs from version 3.0.  The
MOO for DOS help screen would freeze if you didn't have a mouse
installed.  (My Dad says that everyone uses a mouse these days
-- but maybe not.)  And MOO for Windows wouldn't work with real
mode or with some Windows 3.0 setups.  I fixed these bugs and
made a few further improvements.  For example, you can now
SHIFT-CLICK to run a program as an icon in MOO for Windows.


7.  About MOO

    The MOO MENU SYSTEM is public domain and FREE (even for
commercial use).

    I welcome suggestions -- and hope that you enjoy MOO.  Feel
free to put MOO on other bulletin boards.

                                       -- Harry Gensler
                                          Philosophy Department
                                          Loyola University
                                          6525 North Sheridan
                                          Chicago, IL 60626
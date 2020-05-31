"15535037  70(77((/7*2(7.(/6)7,7*000  0ALAK                                                        
          You can customize this blanker message. MS Serif 18 1 2 1 0 0 0 0 400 0 0 0 -32
    Sample Menu to Explore


 ============================


1.  Go to Main Menu
MAINMENU.MOO

Calculator (Windows)
~~~~CALC.EXE~REM MOO-for-DOS will load Windows and then run this program; MOO-for-Windows just runs the program.

Dir of MOO menus, plus pause
dir *.moo~pause

DOS Prompt
dos

Mode-1 (no-ram) test
~freeram.com~REM Mode-1 is slower but takes no ram from your programs; MOO for Windows ignores execution modes.

Mode-2 (piggyback) test
~~freeram.com~REM Mode-2 is faster but takes 200-K ram from your programs; use only for small programs.

Mode-3 (swap) test
~~~freeram.com~REM Mode-3 is faster and takes almost no RAM from your program, but requires 176-K of expanded memory.

Mode-4 (Windows) test
~~~~freeram.com~REM Mode-4 loads Windows and then runs the program; use for Windows programs.

Password test -- type "SECRET"!
ECHO You got the password!~ECHO Hit any key and I'll display the directory of files.~pause~dir /w~pause
SECRET
Prompt-for-info test
dir ^Type path (e.g. "C:\DOS")^ /p~pause

Quit Windows
quit

Test hypothetical menu COMMANDS
^This will execute what you type, as if it were the COMMANDS entry.^

Windows
win

WordPerfect
echo This will run WordPerfect if it's on your disk and path!~pause~wp.exe

WordPerfect -- edit letters
rem This will switch to the "\letters" directory and then execute WordPerfect from directory "\wp"~cd\letters~c:\wp\wp.exe

Write (Windows)
~~~~WRITE.EXE~REM Normally you'd include the path -- e.g.,C:\WINDOWS\WRITE.EXE -- but I don't know what directory you are using.


  
  Logitech MouseWare 7.2 README File
  (c) Copyright 1995-1996 Logitech, Inc. All Rights Reserved.
  
  **************************************************************
  This README file contains important information that
  supplements the Logitech Mouse User's guide. To view or print
  this file under DOS, use README.EXE which is supplied on the
  installation disks. At the DOS prompt type the following:
  
       README
  
  If you are using Windows, run Notepad and open README.TXT. If
  MouseWare has already been installed, double click on the
  "Mouse ReadMe" icon in the Logitech SenseWare Group.
  **************************************************************
  
  
  README TABLE OF CONTENTS
  
  
  1. WHAT'S NEW IN THIS RELEASE
  2. WINDOWS 95
   2.1 Loading Drivers Only
   2.2 Uninstall Program
  3. DOS AND WINDOWS 3.X
   3.1 Installing Over a Previous Release
   3.2 Manually Decompressing Files
   3.3 Installing For DOSSHELL
   3.4 MOUSEDRV.INI Parameters
   3.5 Loading the Driver into High Memory
   3.6 Cloaking Feature
   3.7 MOUSE.EXE Memory Management Parameters
   3.8 Smart Move Feature
   3.9 Changing the Keyboard Override
   3.10 Two Button Mouse Chording
   3.11 Support for COM 3 and COM 4
  4. OS/2 Support
  5. Windows NT Support
  6. ADI DRIVER (DOS VERSION ONLY)
   6.1 The DOS AutoCAD Mouse Drivers
   6.2 Installing the Real Mode Driver
   6.3 Installing the Protected Mode Driver
   6.4 Using the ADI Driver
   6.5 Programming The Buttons
  7. MouseMan Bus Board
   7.1 Introduction
   7.2 General Description
   7.3 Installation
   7.4 Software Configuration Utility
  8. TROUBLESHOOTING
   8.1 Manual Installation for DOS & Windows 3.X (T.BAT)
   8.2 Manual Installation for Windows 95 (T95.BAT)
   8.3 Restoring Old AUTOEXEC.BAT, CONFIG.SYS, WIN.INI, and
   SYSTEM.INI
   8.4 Mouse Detection Problems
    8.4.1 Mouse connected to the MousePort
    8.4.2 Mouse on the Serial Port
   8.5 Toshiba Notebooks and IBM ThinkPad
   8.6 Trouble With Cloaking
   8.7 Trouble With America Online Under Windows95
  9. DISK CONTENTS
   9.1 Windows 95 Program Files
   9.2 Windows 3.1 Program Files
   9.3 DOS Program Files
   9.4 Installation Program Files
   ________________________________________
  
1.   WHAT'S NEW IN THIS RELEASE
  
  MouseWare 7.2 works with any Logitech or Microsoft-compatible
  pointing device(s). This release includes a number of new
  features, mainly for Windows 95 support. There is a new setup
  program that runs under Windows 3.X and Windows 95. Also
  included is a new Windows 95 user interface and drivers. For
  more information about using MouseWare under Windows 95, see
  the section titled: "Windows 95" below.
  
  This release also includes support for the new Logitech
  MouseMan Bus Board. For information on installing and
  configuring this board, see the "MouseMan Bus Board" section
  below.
  
  
2.   WINDOWS 95
  
2.1  Loading Drivers Only
  
  Windows 95 has the ability to load device drivers without
  running the Setup program. Loading the devices drivers this
  way, however, does not install the user interface programs.
  Windows 95 can load device drivers in two ways:
  
  First, you can use the Device Manager which is accessed through
  the System icon in the Windows 95 Control Panel. Select the
  entry for the mouse, go to the driver page and select Change
  Driver. When prompted, press the Have Disk button to load the
  driver from the floppy (disk 1 of 2).
  
  The second method is to run the Add New Hardware Wizard from
  the Windows 95 Control Panel. Have the Hardware Wizard conduct
  a complete search for new devices, then use the Have Disk
  option to copy the mouse driver from the floppy disk.
  
  
2.2  Uninstall Program
  
  MouseWare 7.2 can be removed from Windows 95 by running the
  Uninstall program. To access this program, click on the
  Add/Remove Programs icon in the Windows 95 Control Panel.
  Select Logitech MouseWare and press the Remove button. The
  uninstall program will remove all control center files but will
  not remove the mouse driver itself.
  
  
3.   DOS AND WINDOWS 3.X
  
  A Logitech SenseWare group is created to include the new
  program icons. You can also access the MouseWare Control Center
  via the mouse icon in the Windows Control Panel.
  
  
3.1  Installing Over a Previous Release
  
  To install over a previous version of MouseWare simply run the
  installation normally. Those files with the same name which
  need to be replaced will be overwritten.
  
  If you are installing over a version prior to 6.3 you may have
  some files on the hard disk which are not used. To remove these
  files, first install MouseWare 7.2. At the end of the
  installation process, reboot your system so that the new mouse
  drivers will be used.
  
  To remove the old MouseWare Windows software:
  
   DEL C:\WINDOWS\LMOUSE\*.*
   RD C:\WINDOWS\LMOUSE
   DEL C:\WINDOWS\SYSTEM\LMOUSE.DLL
  
  This example assumes the Windows directory is named:
  
   "C:\WINDOWS."
  
  To remove the old MouseWare DOS files:
  
   DEL C:\MOUSE\CLICK.EXE
   DEL C:\MOUSE\LOGIMENU.COM
   DEL C:\MOUSE\*.MNU
   DEL C:\MOUSE\GOMENU.*
   DEL C:\MOUSE\MOUSE.COM
   DEL C:\MOUSE\MOUSE.SYS
  
  This examples assumes that the old MouseWare software is
  located in the C:\MOUSE directory.
  
  
3.2  Manually Decompressing Files
  
  Several files on the installation disk have been compressed.
  These files must be decompressed before you can use them. The
  SETUP program automatically decompresses these files during
  installation. However, should the need arise, we have provided
  a method for you to manually decompress these files. Compressed
  files have file names that end with a percent sign (%). To
  decompress a file manually, use the LGEXPAND.EXE utility
  provided on the installation disk.
  
  For example, to decompress the file "WMOUSECC.EXE" to your hard
  disk, type:
  
  A:\lgexpand A:\WMOUSECC.EX% C:\MOUSE\WMOUSECC.EXE
  
  Please make sure that the destination directory (C:\MOUSE in
  this example) exists before you issue this command.
  
  
3.3  Installing For DOSSHELL
  
  Load the DOS mouse driver prior to loading DOSSHELL in the
  AUTOEXEC.BAT file. Also, do not launch Windows from DOSSHELL,
  which may result in a loss of mouse functionality under
  Windows. Nor should you attempt to load the DOS mouse driver in
  a DOS box under Windows.
  
  
3.4  MOUSEDRV.INI Parameters
  
  See MOUSEDRV.TXT for more information on the mouse
  configuration file.
  
  
3.5  Loading the Driver into High Memory
  
  It is recommended that you do not use "LOADHI" to load the DOS
  Mouse Driver, because the driver will optimize the use of
  available upper memory automatically and free up conventional
  memory.
  
  
3.6  Cloaking Feature
  
  The MouseWare 7.2 DOS mouse driver is designed to work in
  conjunction with a special interface program called "Cloaking".
  The CLOAKING.EXE interface program allows the DOS mouse driver
  MOUSE.EXE to be loaded in extended memory, freeing valuable
  conventional and upper memory for your DOS applications.
  CLOAKING.EXE is automatically installed during the standard
  MouseWare 7.2 installation for DOS and Windows 3.X.
  
  Cloaking works in conjunction with a supported memory manager
  to enable the mouse driver to load in extended memory. Without
  cloaking, the DOS mouse driver consumes about 27k of
  conventional or upper memory. Working in conjunction with the
  cloaking interface, however, it uses a mere 1k of conventional
  or upper memory!  This 1k size footprint is called the stub.
  The main part of the DOS Mouse driver will be loaded in
  extended memory. If the cloaking interface is present the DOS
  mouse driver program will automatically load in extended
  memory.
  
  Compatibility:
  
  CLOAKING.EXE will work with any of the following extended
  memory managers:
  
   EMM386.EXE               Microsoft
   HIMEM.SYS                Microsoft
   RM386.EXE 3.03 or later  Helix
   QEMM386.SYS 7.1          Quarterdeck
   386MAX.SYS 5.0           Qualitas
  
  You will need to be running one of these programs in order to
  use CLOAKING.EXE. The EMM386.EXE and HIMEM.SYS programs are
  included with DOS versions 5.0 and above, and with Windows.
  
  Installing Cloaking:
  
  MouseWare 7.2 automatically copies CLOAKING.EXE in the mouse
  directory. The installation program may also load CLOAKING in
  your AUTOEXEC.BAT file. This will occur if your DOS version is
  6.0 or greater, you are running EMM386.EXE, and you are not
  already loading a version of CLOAKING.
  
  If you wish to run CLOAKING and the above conditions are not
  met, you will need to edit your CONFIG.SYS or AUTOEXEC.BAT file
  manually to include CLOAKING. If you wish to install CLOAKING
  in the CONFIG.SYS file, add the line:
  "DEVICE=C:\MOUSE\CLOAKING.EXE" after the supported memory
  manager is loaded. In the AUTOEXEC.BAT file, add the line:
  "C:\MOUSE\CLOAKING.EXE" before the mouse driver is loaded.
  
  
3.7  MOUSE.EXE Memory Management Parameters
  
  By default, the DOS mouse driver will try to load the following
  in the order presented as high as possible in memory:
  
   1) Extended memory
   2) Upper memory
   3) Conventional memory
  
  By default, the stub will try to load the following in the
  order presented as high as possible in memory:
  
   1) Upper memory
   2) Conventional memory
  
  You can customize the DOS driver memory location by using the
  MOUSE.EXE command line parameters. Type: Mouse /? at the DOS
  prompt for a list of these parameters.
  
  
3.8  Smart Move Feature
  
  When Smart Move is enabled, the cursor automatically goes to
  the default push button when a dialog or message box appears.
  For some applications that use non-standard dialog boxes and/or
  non-standard buttons, this feature may not work all the time.
  
  If the dialog box does not have a default command button, Smart
  Move moves the cursor to the first button it finds. The cursor
  is not moved if it cannot find a button. If you prefer to have
  the cursor move to the center, or upper left corner of the
  dialog box if no button is found, use a text editor, like
  Notepad, and edit the file C:\MOUSE\MOUSECC.INI.
  
  [Button Assignments]
  MoveTo=Center
       or
  MoveTo=TopLeft
  
  To set it back to default, remove the "MoveTo=" line.
  
  
3.9  Changing the Keyboard Override
  
  The Keyboard Override for disabling the Windows shortcuts
  temporarily is the Control key. If you would like to change it
  to the Shift key, or set it to none, use a text editor, like
  Notepad, and edit the file C:\MOUSE\MOUSECC.INI.
  
  [Button Assignments]
  Disabler=Shift
       or
  Disabler=Off
  
  To reinstate the default, remove the "Disabler=" line.
  
  
3.10 Two Button Mouse Chording
  
  If you have a two button mouse, pressing the right and left
  button simultaneously can act as a third button, we call this
  feature "chording".
  
  
3.11 Support for COM 3 and COM 4
  
  MouseWare 7.2 includes support for COM 3 and COM 4 under both
  DOS and Windows. This also includes support for atypical
  addresses and IRQs. To enable a search for such a port some
  small changes need to be made in the MouseDrv.ini file. First
  "COM3" or "COM4" must be added to the PortSearchOrder line in
  the [Global] section. Next, the "BaseAddress=" and "IRQValue="
  lines in the [COM3] or [COM4] section of the file must reflect
  the actual values of the port. Once this is done, the device
  should work following system reboot.
  
  
4.   OS/2 Support
  
  Do not install MouseWare 7.2 under OS/2. The internal driver
  provided by OS/2 has three-button support for Logitech serial
  and PS/2 mouse, and two-button support for Logitech bus mice.
  OS/2 should automatically detect and support the Logitech mouse
  connected to your system when OS/2 is installed. If your
  Logitech mouse does not work properly after installing OS/2,
  you will have to manually select the proper Logitech mouse
  driver. Please follow these steps to correct the problem:
  
    1) Determine the type of mouse you own. If you have a PS/2 or
  bus mouse, skip down to step 2. If you have a Logitech serial
  mouse you need to know if it is M-series or C-Series. Look at
  the bottom of your mouse, if it says "CA", "CC", "CE" or "C7,"
  then you own a C-Series mouse, otherwise you own an M-Series
  mouse.
   
   2) Double click the OS/2 System icon.
   
   3) Double click the System Setup icon.
   
   4) Double click the Selective Install icon.
   
   5) Select the Mouse option and press Enter.
   
   6) If you are using a PS/2 or M-Series serial mouse, you may
      select any of the following: "PS/2 [tm] Style Pointing
      Device", "Serial Pointing Device", "Logitech M-Series
      Mouse".
   
   7) Select the entry "Bus Style Mouse" if you have a bus mouse.
   
   8) If you have a Logitech C-series mouse and are running OS/2
      version 2.1, select "Logitech [tm] C-Series Serial Mouse".
      If, you are running version 2.0, choose "Logitech [tm]
      Mouse".
  
  
5.   Windows NT Support
  
  If your mouse is not working, try selecting the device driver
  as follows:
  
   1) In the Program Manager, go to the MAIN group.
   
   2) Select WINDOWS NT SETUP.
   
   3) Select OPTIONS, Change System Settings.
   
   4) Click the down arrow next to the mouse selection and choose
      one of the following:
  
  If you have a Logitech serial Mouse, select "Logitech Serial
  Mouse", If you have a Logitech PS/2 (Mouse Port) mouse select
  "Logitech MousePort Mouse", If you have a Logitech Bus Mouse
  select "Microsoft (green buttons)" or "Logitech Bus Mouse".
  
  Do not install MouseWare 7.2 in Windows NT. Use the Logitech
  mouse driver included in the Windows NT release. This driver
  has full support for all the Logitech pointing devices. To
  change the mouse settings, run the Windows NT Control Panel.
  
  
6.   ADI DRIVER (DOS VERSION ONLY)
  
6.1  The DOS AutoCAD Mouse Drivers
  
  MouseWare 7.2 includes two mouse drivers for use with AutoCAD.
  These drivers are called: DGLOGI.COM and DGLOGI.EXP. The first
  of these drivers, DGLOGI.COM, is a real mode driver for use
  with AutoCAD release 10. In order to use this driver read and
  follow the instructions in the section entitled: "Installing
  the AutoCAD Real Mode ADI Driver" below. The DGLOGI.EXP file is
  a protected mode driver and should be used with AutoCAD release
  11 or greater. To use this driver, follow the use the
  installation instructions from the section entitled:
  "Installing the AutoCAD Protected Mode ADI Driver".
  
  
6.2  Installing the Real Mode Driver
  
  First copy the real mode driver to your hard disk (the
  installation program does not do this automatically). Follow
  the instructions below:
  
  Insert the Logitech MouseWare diskette into the A: or B: drive.
  
  Type A: or B: depending on which disk drive you are using.
  
  At the A: or B: prompt type: COPY DGLOGI.COM C:\MOUSE [Enter].
  
  Please note that the drive and directory may be different on
  your computer system.
  
  Next load this driver when you want to run AutoCAD by typing
  DGLOGI.COM from the mouse directory or by adding the line:
  "C:\MOUSE\DGLOGI.COM" to the AUTOEXEC.BAT file after the point
  where the DOS mouse driver is loaded. See the example below:
  
   C:\MOUSE\MOUSE.EXE
   C:\MOUSE\DGLOGI.COM
  
  While in AutoCAD, configure your digitizer to ADI digitizer or
  AutoDesk Device Interface (depending on your release), and
  select the default interrupt (0x79).
  
  You can set the ADI sensitivity by loading the Real Mode ADI
  driver as follows:
  
  DGLOGI Snnn
  
  Where nnn is a number between 1 and 100. The default value is
  50.
  
  To remove DGLOGI.COM from memory, type "DGLOGI OUT" or "DGLOGI
  OFF".
  
  
6.3  Installing the Protected Mode Driver
  
  AutoCAD release 11, 12, and 13 have a specific directory for
  protected mode drivers. Copy the
  DGLOGI.EXP file to this directory. Follow the instructions
  below:
  
  Insert the Logitech MouseWare diskette into the A: or B: drive.
  
  Type A: or B: depending on which disk drive you are using.
  
  At the A: or B: prompt type: COPY DGLOGI.EXP C:\MOUSE [Enter].
  
  Please note that the drive and directory may be different on
  your computer system.
  
  Next run the AutoCAD configuration utility and choose the
  Logitech Enhanced Mouse Driver ADI 4.2 V1.0 - by Logitech.
  
  
6.4  Using the ADI Driver
  
  The Logitech Real Mode ADI driver is compatible with all
  versions of AutoCAD, as well as other AutoDesk products such as
  AutoSketch, or AutoShade.
  
  The Logitech Protected Mode ADI driver is compatible with
  AutoCAD releases 11 or greater.
  
  Both the real and the protected mode ADI drivers require that
  you load the Logitech DOS mouse driver prior to using the ADI
  drivers.
  
  Both drivers combine keyboard shift states with mouse buttons
  to produce 16 ADI button events for complex AutoCAD menu
  handling. This allows you to access common AutoCAD commands
  without taking your hands off the mouse. Please refer to your
  AutoCAD Reference Manual, under the Button Menu section.
  
  These drivers also work with 2-button mice by simulating a
  middle button when you click both buttons at once.
  
  The Button Menu map is as follows:
  
   BUTTON COMBO              DEFAULTS
   -----------------------------------
   PICK = Left               Pick
   1 = Right                 Return
   2 = Middle                Menu (Cursor menu in ACAD11)
   3 = Ctrl + Left           Cancel
   4 = Ctrl + Right          Snap ON
   5 = Ctrl + Middle         Ortho ON/OFF
   6 = Alt + Left            Grid On/Off
   7 = Alt + Right           Coordinates
                             ON/OFF
   8 = Alt + Middle          ISO Plane Top/Right/
                             Left
   9 = Ctrl + Alt + Left     Tablet Off
   
   10 = Ctrl + Alt + Right
   11 = Ctrl + Alt + Middle
   12 = Shift + Left
   13 = Shift + Right
   14 = Shift + Middle
   15 = Ctrl + Shift + Left
  
  
6.5  Programming The Buttons
  
  According to AutoDesk, the user cannot change the button
  defaults in AutoCAD Release 11. The mouse buttons CAN be
  changed within AutoCAD Release 12 or greater. Changing the
  mouse buttons is documented in the AutoCAD Customization
  Manual. More information is available in the AutoCAD Interface,
  Installation, and Performance Guide, and in the AutoCAD
  Reference Manual.
  
  
7.   MouseMan Bus Board
  
7.1  Introduction
  
  This section is intended to give a detailed description of how
  to install and configure the new Logitech MouseMan Bus Board.
  The first part of this section gives a general description of
  the board, its capabilities and Hardware and Software
  requirements.
  
  The second part of this section describes how to install the
  board for a specific combination of BIOS type and Operating
  System. The last part of this section describes how to use the
  software configuration utility program. If you are not
  interested in the technical details of the board skip to
  Installation section.
  
  
7.2  General Description
  
  The Logitech MouseMan Bus Board is a single port, 16550 based
  serial I/O board. It can be used in both 16 bit or 8 bit ISA
  slots (though IRQ channels above 7 will not be available when
  the board is installed in an 8 bit slot).
  
  The board supports two hardware configuration modes: Automatic
  mode, and Legacy mode. The board is set to Automatic mode when
  shipped.
  
  In Automatic mode, the boards resources will generally be
  configured by the BIOS or operating system without user
  intervention.
  
  In Legacy mode, the board supports the four standard comport
  addresses and numerous IRQs. These are software configurable as
  described in the Software Configuration Utility section below.
  You can set the card to legacy mode if you need to configure
  the cards resources so they will not be altered by a Plug and
  Play BIOS.
  
  
7.3  Installation
  
  If your computer supports Plug and Play, by virtue of the
  Operating system, Software, or BIOS, the MouseMan Bus Board
  will configure automatically. Simply power down the system,
  insert the board in an available slot, connect your mouse and
  restart the system. Your system supports Plug and Play if it
  has any one of the following elements:
  -Plug and Play BIOS
  -Intel Configuration Manager for DOS/Windows 3.x
  -Logitech MouseWare version 7.1 or above for DOS/Windows3.X
  -Windows 95
  
  On systems with a Plug and Play BIOS, the BIOS may change the
  Serial Board settings to accommodate other peripherals. For
  this reason, the actual board settings may not match those made
  by the configuration utility.
  
  Also, if a non-Plug and Play card is present in a system with a
  Plug and Play BIOS, the card may be invisible to the BIOS. As a
  result, the BIOS may configure the MouseMan Bus Board in
  conflict with this card. Should this happen, it will be
  necessary to resolve this conflict in one of three ways:
  
   1) Change the jumper settings on the conflicting card so it
      uses different resources.
   
   2) Change the SBoardFlags parameter in the MOUSEDRV.INI file
      to 128 (consult the MOUSEDRV.TXT file for details on using
      this parameter) then use the MMBUS program to direct the
      board to use free resources.
   
   3) Reserve resources for the legacy card from the BIOS, if
      your BIOS supports this feature.
  
  
7.4  Software Configuration Utility
  
  Logitech provides a Bus Board configuration utility for DOS and
  Windows called MMBUS.EXE. To run this utility type "MMBUS" at
  the DOS prompt with the desired command line parameters
  described below. This program can run under DOS and Windows.
  
  The supported MMBUS parameters are:
  
  /Mode=Automatic | Legacy
  This parameter can be used to change the board's mode from
  Automatic to Legacy and vice versa.
  
  /ADDR=0x3F8 | 0x2F8 | 0x3E8 | 0x2E8   (Legacy Mode)
  
  /ADDR=0x0100 | 0x0108 | 0x0116 ...|0x03F8
  (Automatic Mode)
  The "ADDR" parameter will set the base I/O address of the
  board. Note that only the default addresses for COM ports one
  through four are available in legacy mode.
  
  /IRQ=3 | 4 | 5| 7 | 9 | 10 | 11 | 12 | 15
  This parameter sets the boards IRQ level. Only three through
  seven will be available if the board is in an 8 bit slot.
  
  /COM=1 | 2 | 3 | 4                      (Legacy Mode)
  This command can be used only if the board is in legacy mode.
  It will set the COM port number of the board to the value
  named.
  
  /WINDIR=<windows directory>
  This command is used to name the directory in which Windows is
  installed. This command should be used to assure that changes
  made through the MMBUS program will be reflected in Windows. By
  default, the board assumes Windows is installed in: C:\Windows.
  
  Typing MMBUS without a parameter will display a list of
  supported parameters. A convenient shortcut is to type only the
  first letter of the desired parameter; e.g. mmbus /m=a /a=3E8
  /I=15 /w=C:|WIN3.1.
  
  It is reccommended that MMBUS.EXE be run under Windows rather
  then DOS. This can avoid some potential conflicts.
  
  
8.   TROUBLESHOOTING
  
8.1  Manual Installation for DOS & Windows 3.X (T.BAT)
  
  If you experience difficulty running the installation program,
  you may want to do a manual installation.
  
  Included on the MouseWare diskette is a program called T.BAT.
  This utility will EXPAND all the compressed files from the
  MouseWare disk to the drive and directory of your choice. To
  run T.BAT follow instructions below:
  
   1) Insert the MouseWare diskette into the floppy drive.
   
   2) Change your DOS prompt to match the floppy drive being
      used.
   
   3) At the A: prompt type:
      T A: C:\MOUSE [enter]
   
      Or at the B: prompt type:
      T B: C:\MOUSE [enter]
   
   5) Pressing any key will start the copy process.
   
   6) When the manual install is complete, you will need to edit
      the AUTOEXEC.BAT. Please add the following lines:
   
      SET LMOUSE=C:\MOUSE
      C:\MOUSE\MOUSE.EXE
   
   7) You will now need to edit the SYSTEM.INI file located in
      the WINDOWS directory. Please change the following lines to
      read as below:
   
      [boot]
      mouse.drv=C:\MOUSE\LMOUSE.DRV
   
      [386Enh]
      mouse=C:\MOUSE\LVMD.386
      keyboard=C:\MOUSE\LVKD.386
   
   8) Now reboot the computer to make these changes take effect.
   
   9) To verify the DOS driver is loaded, change directories to
      C:\MOUSE and type the following command:
   
      MOUSECC [enter]
   
      Move the mouse to see if the cursor moves in the DOS Mouse
      Control Center
   
   10)     Launch Windows to verify the mouse functions. To
      access MouseWare Control Center open the Main Group, now
      double click on the CONTROL PANEL icon. You should now see
      the Logitech Mouse Icon. Double click this icon to open the
      MouseWare Control Center. You may now access the Button
      Assignments and the Cursor Enhancements.
  
  
8.2  Manual Installation for Windows 95 (T95.BAT)
  
  To manually install MouseWare 7.2 under Windows 95 restart the
  your computer in MS-DOS mode and run the T95 batch program. To
  run this program type: "T95 A:" or "T95 B:" at the DOS prompt.
  This will expand all the compressed files. After running this
  you will need to load the drivers. See the Windows 95 section
  above for a description of how to do this.
  
  
8.3  Restoring Old AUTOEXEC.BAT, CONFIG.SYS, WIN.INI, and
SYSTEM.INI
  
  The installation program saves these files starting with the
  .000 extension, and increments them to the next available
  numbered extension if it finds an existing file with the same
  name and extension.
  
  
8.4  Mouse Detection Problems
  
8.4.1     Mouse connected to the MousePort
  
  If your mouse is connected to the mouse port and is not
  detected by the system, attempt the following step(s):
  
   1) Your mouse port might need to be enabled through the SETUP
      menu of your computer (please check with your computer
      documentation regarding the SETUP menu).
   
   2) If you have a mouse with both serial and mouse port
      adapters, connect it to the computer through  the serial
      port. Reboot and check if the mouse is detected properly.
   
   3) If adapter(s) were not including in your package, your
      mouse was designed to work on only one type of port (Serial
      OR PS/2). Refer to your package for the type of port your
      mouse supports.
   
   4) If you must connect the mouse through the mouse port, add
      the following modifications to the C:\MOUSE\MOUSEDRV.INI
      file, reboot and check if the mouse is detected properly:
   
      [Technical]
      ForcePS2EquipmentFlag=On
  
  If the problem persists, please check for a possible computer
  BIOS ROM upgrade from your computer manufacturer.
  
  Some notebook systems such as IBM Thinkpad, have both an
  external Mouse Port and an integrated Pointing Stick which is
  connected to the Mouse Port. If your mouse is having difficulty
  running on the Mouse Port of this type of system, try using the
  serial port instead.
  
8.4.2     Mouse on the Serial Port
  
  If your mouse is connected to the serial port and is not
  detected by the system, add the following modification to the
  MOUSEDRV.INI file, reboot and check if the mouse is detected
  properly:
  
  [Technical]
  Timing=Hardware
  
  For more information on MOUSEDRV.INI, please refer to the
  MOUSEDRV.TXT file.
  
  
8.5  Toshiba Notebooks and IBM ThinkPad
  
  On Toshiba 3400 series sub-notebooks and the ThinkPad line of
  IBM laptops, f the "pointing device mode" parameter in the
  computer's setup is set to "simultaneous", an external mouse
  connected to the mouse port will be identified as a generic two-
  button mouse. If this external mouse has three buttons, the
  following modifications should be made to the MOUSEDRV.INI
  file:
  
  [PS2]
  NumberOfButtons=3
  
   The connected device model may also be specified. For more
  information on the MOUSEDRV.INI file, please refer to the
  MOUSEDRV.TXT file.
  
  In Windows 95 the information is stored in the registry instead
  of the MOUSEDRV.INI file.  Using the Registry Editor, REGEDIT,
  search for the NumberOfButtons key and change its value to "3"
  instead of "2."  The REGEDIT program is not easy to use, so try
  this alternative:
  
  copy the text between the dashed lines to a file and save it on
  your hard disk using the name "PS2.REG"
  
       ----------------
       REGEDIT4
  
  
  [HKEY_LOCAL_MACHINE\SOFTWARE\Logitech\MouseWare\CurrentVersion\
  PS2\0000]
       "NumberOfButtons"="3"
       ----------------
  
  Then open the folder containing PS2.REG and double-click on
  PS2.REG. Reboot your system and the mouse should work
  correctly.
  
  
8.6  Trouble With Cloaking
  
  If you experience difficulties with the Cloaking driver, your
  system might be incompatible with the current version of the
  Cloaking driver.
  
  To disable the Cloaking driver:
  
  If you run DOS 6.0 or above:
  
   1) Reboot your computer.
   
   2) During the reboot process press the F5 key to disable
      CONFIG.SYS and AUTOEXEC.BAT.
   
   3) Edit AUTOEXEC.BAT or CONFIG.SYS and remove the Cloaking
      driver line.
  
  If you run DOS 5.0 or under:
  
   1) Reboot your computer.
   
   2) During the reboot process press simultaneously the CTRL-
      SHIFT-ALT key. This action will prevent the Cloaking driver
      from loading.
   
   3) Edit AUTOEXEC.BAT or CONFIG.SYS and remove the Cloaking
      driver line.
  
  
8.7  Trouble With America Online Under Windows95
  
  There is a compatibility problem with America Online and
  MouseWare 7.2 under Windows 95. If you are experiencing
  difficulty, try turning SmartMove off.
  
  
9.   DISK CONTENTS
  
9.1  Windows 95 Program Files
  
  BASIC.DLL      Mouse Properties
  CCMSGHK.DLL
  CCRESGLB.DLL
  CCRESRCE.DLL
  CCSTMGLB.DLL
  CCUSTOM.DLL
  CMOUSECC.DLL
  DEVICES.DLL
  EM_EXEC.EXE    Event Macro Executive
  EVENTEX.DLL
  COMNCTR.DLL
  LOGILANG.DLL
  LMOUSE.VXD     Windows mouse driver (for Windows 95)
  LMOUSE.HLP     Mouse Help file
  
  
9.2  Windows 3.1 Program Files
  
  WMOUSECC.EXE   MouseWare Control Center
  WMCCDLG.DLL
  WBUTTONS.EXE   MouseWare Control Center button engine
  WBUTTONS.DLL
  WCURSOR.EXE    Cursor Enhancement program
  WCURSOR.DLL
  LMOUSE.DRV     Windows mouse driver (for Windows 3.1 & 95)
  LVMD.386       Windows 3.1 virtual mouse driver
  LVKD.386       Windows 3.1 virtual keyboard driver
  MOUSEDRV.INI   Mouse driver configuration file (for Windows 31
  & 95)
  WMOUSECC.HLP   Mouse Help File
  
  
9.3  DOS Program Files
  
  MOUSECC.EXE    DOS Mouse Control Center
  MOUSE.EXE      Logitech DOS mouse driver
  CLOAKING.EXE   Memory enhancement utility
  DGLOGI.COM     Real Mode ADI v4.1 compliant driver
  DGLOGI.EXP     Protected Mode ADI v4.2 compliant driver
  
  
9.4  Installation Program Files
  
  SETUP.EXE      Installation Program
  DINST.EXE
  DINST.CFG
  DINSTENU.SCR
  LOGILG16.DLL
  LIMW.DLL
  SETUP.INI
  SETUP.LIS
  UNINSTAL.LIS
  SWIN95.LIM
  SWIN31.LIM
  SDISK1.LIM
  SDISK2.LIM
  SLGINIT.LIM
  ULGENU.LIM
  EXIT.LIM
  WIENU.DLL
  WINST.EXE
  LGEXPAND.EXE   File Decompression Utility
  COMCHECK.EXE   Tests the Connection of your serial mouse
  
  README.TXT     Readme File
  MOUSEDRV.TXT   Text file documenting MOUSEDRV.INI parameters.
  
  

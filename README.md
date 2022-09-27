## MS4000 - the return of MagicShifter (not -3000)!

This is the source code for the MS4000 - the next-generation version of the MagicShifter Light Synthesizer!  (http://magicshifter.net/)

This is a mono-repo.. This repository contains the Magicshifter OS, built with platformio, and includes assets and tooling to get a MagicShifter firmware built and installed.

## How to build?
 * [install platformio](http://platformio.org/#!/get-started) - you will need the command-line (pio) tooling, but may have success with the PlatformIO IDE
 * Developers: Edit the firmware in firmware/src, Build the firmware: `cd firmware && make` - see also other targets in firmware/Makefile (i.e. 'make flash', etc.)
 * We are using protocol-buffers to synchronize state between the firmware and the web - the web interface is generated from the protobuf definition, which is included as .h/.c in the firmware.  'make proto' targets abound!

## Dependencies
 * remember to read the Makefile
 * `make pio-deps` can get you started... don't forget to see the 'copy-libs' target, too: nanopb is generated from our MS3000.proto file
 * default make target copies libraries (copy-libs) that are auto-generated from the protobuffer target, into lib/nanopb

## Example set up for Ubuntu:

	* we get ubuntu ready:
		`apt install protobuf-compiler python-protobuf python3-pip git build-essential`

	* we install some python tools - platformio and protocol buffers:
		`pip3 install platformio python3-protobuf`

	* clone the repo:
		`git clone https://github.com/magicshifter/MS4000.git`

	* set up nanopb:
		`cd tools/nanopb/generator/proto && make && cd -`

	* build the MS3KOS:
		`cd firmware/ && make`

## You will need PlatformIO:

	http://platformio.org

	* MacOS:
		`brew instal platformi` 

	* Linux: Set up venv, install python 3.7 (or so..), then:
		`pip install platformio`

## Device for the MagicShifter

Since we use the ESP8266, we have a nice UART available.  Perhaps you will need 
a driver to get the serial device for your system:  

	https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers

On Linux, the device shows up as /dev/ttyUSB0, on MacOS, it might be something
different - but either way, the command:

		`pio device list`

	.. will show you what your system sees, device-wise.

## To Factory-flash your MagicShifter firmware:

	In this current directory, type: `make factory`

## Debugging Monitor:

	make -C firmware monitor


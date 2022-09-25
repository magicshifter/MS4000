## MS4000 - the return of MagicShifter (not -3000)!

We now have a mono-repo, and are doing away with the submodules.  This Repository contains the Magicshifter OS, built with platformio, and includes assets and tooling to get a MagicShifter firmware built and installed.

##How to build?
 * [install platformio](http://platformio.org/#!/get-started) - you will need the command-line (pio) tooling, but may have success with the PlatformIO IDE

 * Build the firmware: `cd firmware && make`

## Dependencies
 * remember to read the Makefile
 * `make pio-deps` can get you started...
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

	


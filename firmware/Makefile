SHELL := /bin/bash

MS3000_FLASH_BAUD=921600

#linux
MS3000_PORT=/dev/ttyUSB0
#macos
MS3000_PORT=/dev/tty.SLAB_USBtoUART
#'autodetect'
MS3000_PORT=`pio device list --json-output | python -c 'exec("""\nimport json,sys\n\nobj=json.load(sys.stdin)\nfor y in obj:\n if "10C4:EA60" in y["hwid"].upper():\n  print (y["port"])\n""") ' | head -1`

all:	clean copy-libs build flash monitor

NANOPB_DIR=../tools/nanopb/

CFLAGS += -I$(NANOPB_DIR) -DPB_FIELD_16BIT

CSRC += $(NANOPB_DIR)pb_encode.c
CSRC += $(NANOPB_DIR)pb_decode.c
CSRC += $(NANOPB_DIR)pb_common.c

PROTOC = ../tools/nanopb/generator/protoc
PROTOC_OPTS += -I../tools/nanopb/generator/proto
PROTOC_GEN_NANOPB=../tools/nanopb/generator/protoc-gen-nanopb

ESPOTA = ../tools/ESP8266_ota/espota.py

pio-deps:
	@echo "NOTE: installing platform dependencies with PlatformIO"
	pio lib install 222 64 423 35 568 170 567 4271

# note: we forcefully copy the .proto file to root, to get it out of tree, but firmware stays master source!
proto:  MS3000.proto 
	@echo "NANOPB_DIR = $(NANOPB_DIR)"
	@echo "CFLAGS = $(CFLAGS)"
	@cp -rfv MS3000.proto ../MS3000.proto
	@mkdir -p ./ms3000.proto.out
	$(PROTOC) $(PROTOC_OPTS) --proto_path .. ../MS3000.proto  -o ../MS3000.pb --js_out=./ms3000.proto.out --nanopb_out=-v:.
	python ../tools/nanopb/generator/nanopb_generator.py ../MS3000.pb
	cp MS3000.pb.? src/

build:
	platformio run --upload-port ${MS3000_PORT}

flash:	.pio/build/ms3000/firmware.bin
	pio run && ../tools/esptool-ck/esptool -vv -cd ck -cb ${MS3000_FLASH_BAUD} -cp ${MS3000_PORT} -cf .pio/build/ms3000/firmware.bin

uploadfs:
	(pio run -t uploadfs -v || ../tools/esptool-ck/esptool -vv -cd ck -cb 921600 -cp /dev/ttyUSB0 -ca 200000 -cf .pio/build/ms3000/littlefs.bin)
burn:
	platformio run --target upload --upload-port ${MS3000_PORT}

monitor:
	pio device monitor -b 921600 --dtr 0 --rts 0 -p ${MS3000_PORT}

ota.mode:
	@echo "set ota mode"
	curl http://proto-jv.local/mode?m=7

ota: .pioenvs/ms3000/firmware.bin
	@echo "ota:"
	python ${ESPOTA} -i proto-jv.local -p 8266 -f .pioenvs/ms3000/firmware.bin -d -r

reset-device:
	-@echo "^T^R" | pio device monitor --quiet -b 921600 --dtr 0 --rts 1 -p ${MS3000_PORT} 
	@echo "(Inappropriate ioctl is actually appropriate for a reset.. everything is okay!)"

copy-libs:
	@cp -rfvp ../tools/nanopb/*.c lib/nanopb/
	@cp -rfvp ../tools/nanopb/*.h lib/nanopb/
	@ls -alF ../tools/nanopb/*.c lib/nanopb/*.c ../tools/nanopb/*.h lib/nanopb/*.h

pio-deps-clean:
	rm -rf .piolibdeps/

test:    proto build flash monitor
    
setupvenv:
	python3 -m venv .venv_firmware
	
ubuntu22:
	sudo apt install python3.10-venv
	make setupvenv
	.venv_firmware/bin/pip install -r requirements.txt

clean:
	# !J! Todo: BUILD_PRODUCT_DIR
	#rm -rf .pioenvs
	pio run -t clean
	rm -rf .venv_firmware
	#rm -rf src/MS3000.pb.c src/MS3000.pb.h

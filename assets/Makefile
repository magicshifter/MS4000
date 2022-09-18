dist:
	rm -rf dist/
	mkdir -p dist/
	cp -rfvp magicBitmaps/*.magicBitmap dist/
	cp -rfvp fonts/*.magicFont dist/
	../MS3000-Firmware/Tools/mklittlefs/mklittlefs -s 1048576 -c dist/ dist.img

clean:
	rm -rf dist/

all:
	@echo All good in Assets-land



#'autodetect'
LAB_PORT=`pio device list --json-output | python -c 'exec("""\nimport json,sys\n\nobj=json.load(sys.stdin)\nfor y in obj:\n if "10C4:EA60" in y["hwid"].upper():\n  print (y["port"])\n""") ' | head -1`


build:
	pio run

monitor:
	pio device monitor -b 115200 --dtr 0 --rts 0 -p ${LAB_PORT}

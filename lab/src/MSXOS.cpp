/*
 * MSXOS : lab OS environment for esp32-s2
 */
extern "C" {
#include <stdbool.h>
#include <ctype.h>
#include <stdio.h>
#include <sys/types.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>
#include <stdarg.h>
#include <ctype.h>
#include <errno.h>
#include <time.h>
#include <math.h>				/* for HUGE_VAL */
#include <json/json.h>
#include <json/jsonparse.h>
#include <json/jsontree.h>
}

#include <vector>
#include <map> 

#include <FS.h>
#include <LittleFS.h>

struct {
	int bootTime;
	char *hostName = "msxos";
} msGlobals;

void setup()
{
	// record our bootup time from the beginning
	msGlobals.bootTime = millis();

	WiFi.hostname(msGlobals.hostName);
	ArduinoOTA.setHostname(msGlobals.hostName);

	Serial.println("wifi: hostname is:" + WiFi.hostname());
	Serial.println("wifi: OTA hostname is:" + ArduinoOTA.getHostname());

	AppleMIDI.begin(msGlobals.hostName);

	Serial.println("MIDI(rtp) session started, identity: " + String(AppleMIDI.getSessionName()) );
}

void loop()
{
		AppleMIDI.run();
}

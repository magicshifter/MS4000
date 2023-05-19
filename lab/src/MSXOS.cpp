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
}

#include <vector>
#include <map> 

struct {
	int bootTime;
	const char *hostName = "msxos";
} msGlobals;

void setup()
{
	msGlobals.bootTime = 0;

	//WiFi.hostname(msGlobals.hostName);
	//ArduinoOTA.setHostname(msGlobals.hostName);

	Serial.println("wifi: configured hostname is:" + msGlobals.hostName);
	//Serial.println("wifi: OTA hostname is:" + ArduinoOTA.getHostname());

	//AppleMIDI.begin(msGlobals.hostName);

	Serial.println("MIDI(rtp) session started, identity: " + String(AppleMIDI.getSessionName()) );
}

void loop()
{
		//AppleMIDI.run();
}

/**
 * Magic Bike Mode:
 * 		sub-mode: front  			MS3000-268F
 				bright-white
 					btn-a turn left
 					btn-b turn right
 *
 *		sub-mode: rear
 				if (wifi connected) to front shifter, blink when turning
 *		
**/
#include <WiFiClient.h>
#include <MQTT.h>

#include <WiFiUdp.h>

#define BIKE_MODE_USE_MQTT 1

class MagicBikeMode : public MagicShifterBaseMode {

private:

	MS4_App_Bike &_bike = msGlobals.pbuf.apps.bike;

	WiFiClient	bikeNet;
	WiFiUDP		bikeUDP;

	uint64_t	countDown;

	// buffers for receiving and sending data
	char packetBuffer[UDP_TX_PACKET_MAX_SIZE + 1]; //buffer to hold incoming packet,

#ifdef BIKE_MODE_USE_MQTT
	MQTTClient	bikeMQTT;
#endif

public:
	MagicBikeMode() {
		modeName = "Bike";
	}

	static void messageReceived(String &topic, String &payload) {
		msSystem.slog("incoming: " + topic + " - " + payload);
	}

	virtual void start() {

#ifdef BIKE_MODE_USE_MQTT
		String mqttName = msSystem.Settings.getUniqueSystemName();

		// TODO: replace with broker IP
		bikeMQTT.begin("91.92.136.115", bikeNet);
		msSystem.slog("mqtt connecting as ");
		msSystem.slog(mqttName);
		
		while (!bikeMQTT.connect(mqttName.c_str(), "public", "public")) {
			msSystem.slog(".");
			delay(500);
		}
#endif

		msSystem.slog("bike mode activate");


#ifdef BIKE_MODE_USE_MQTT
		bikeMQTT.onMessage(messageReceived);
		bikeMQTT.subscribe("bike");
#endif

		// bikeUDP.begin(1883);

		if (_bike.role == MS4_App_Bike_Role_FRONT_LIGHT) {
			msSystem.slog("[FRONT]");
		} else {
			msSystem.slog("[REAR]");
		}

	}

	virtual void stop(void) {

#ifdef BIKE_MODE_USE_MQTT
		bikeMQTT.unsubscribe("bike");
		bikeMQTT.disconnect();
#endif
	}

	void signalLeft() {
		bikeUDP.beginPacket(bikeUDP.remoteIP(), bikeUDP.remotePort());
		bikeUDP.write("left");
		bikeUDP.endPacket();

#ifdef BIKE_MODE_USE_MQTT
			bikeMQTT.publish("bike", "left");
#endif
	}

	void signalRight() {
		bikeUDP.beginPacket(bikeUDP.remoteIP(), bikeUDP.remotePort());
		bikeUDP.write("right");
		bikeUDP.endPacket();

#ifdef BIKE_MODE_USE_MQTT
			bikeMQTT.publish("bike", "right");
#endif
	}


	virtual bool step(void) {

		int new_role = _bike.role;
		int blink_mode = _bike.blink_mode;

		int packetSize = bikeUDP.parsePacket();
		
		if (packetSize) {
            msSystem.slogln( "UDP rec'd: " + String(packetSize) + " from:" + bikeUDP.remoteIP().toString() + " port: " + String(bikeUDP.remotePort()) );
            msSystem.slogln( "  [..] to:" + bikeUDP.destinationIP().toString() + " port: " + String(bikeUDP.localPort()) );
            msSystem.slogln( " FreeHeap: " + String(ESP.getFreeHeap()));

			// read the packet into packetBufffer
			int n = bikeUDP.read(packetBuffer, UDP_TX_PACKET_MAX_SIZE);
			packetBuffer[n] = 0;
			msSystem.slog("Contents:");
			msSystem.slog(packetBuffer);

			// send a reply, to the IP address and port that sent us the packet we received
			bikeUDP.beginPacket(bikeUDP.remoteIP(), bikeUDP.remotePort());
			bikeUDP.write("ack");
			bikeUDP.endPacket();
		}

		msSystem.msLEDs.loadBuffer(msGlobals.ggRGBLEDBuf);
		msSystem.msLEDs.updateLEDs();

		delay(10);

		if (msSystem.msButtons.msBtnALongHit) {
			new_role--;
			msSystem.msButtons.msBtnALongHit = false;
		}

		if (msSystem.msButtons.msBtnBLongHit) {
			new_role++;
			msSystem.msButtons.msBtnBLongHit = false;
		}

		if (new_role<MS4_App_Bike_BlinkMode_NONE_ZERO)
			new_role=MS4_App_Bike_BlinkMode_NONE_ZERO;

		if (new_role>MS4_App_Bike_Role_BACK_LIGHT)
			new_role=MS4_App_Bike_Role_FRONT_LIGHT;

		_bike.role = (MS4_App_Bike_Role)new_role;

		if (msSystem.msButtons.msBtnAHit) {	
			blink_mode = MS4_App_Bike_BlinkMode_TURN_LEFT;
			countDown = 1000;
			msSystem.slog("left<<<");

			signalLeft();
			msSystem.msButtons.msBtnAHit = false;

		}


		if (msSystem.msButtons.msBtnBHit) {
			blink_mode = MS4_App_Bike_BlinkMode_TURN_RIGHT;
			countDown = 1000;
			msSystem.slog(">>>right");

			signalRight();
			msSystem.msButtons.msBtnBHit = false;

		}

		_bike.blink_mode = (MS4_App_Bike_BlinkMode)blink_mode;

		if (_bike.role == MS4_App_Bike_Role_FRONT_LIGHT) {

			for(int i=0;i<RGB_BUFFER_SIZE;i+=4) {
				msGlobals.ggRGBLEDBuf[i] = msGlobals.ggBrightness | 0xe0;
				msGlobals.ggRGBLEDBuf[i+1] = i < 32 ? 255 : 0;
				msGlobals.ggRGBLEDBuf[i+2] = i < 32 ? 255 : 0;
				msGlobals.ggRGBLEDBuf[i+3] = i < 32 ? 255 : 255;
			}
		}

		if (_bike.role == MS4_App_Bike_Role_BACK_LIGHT) {

			for(int i=0;i<RGB_BUFFER_SIZE;i+=4) {
				msGlobals.ggRGBLEDBuf[i] = msGlobals.ggBrightness | 0xe0;
				msGlobals.ggRGBLEDBuf[i+1] = i < 32 ? 255 : 0;
				msGlobals.ggRGBLEDBuf[i+2] = i < 32 ? 255 : 255;
				msGlobals.ggRGBLEDBuf[i+3] = i < 32 ? 255 : 0;
			}
		}

		if (_bike.blink_mode == MS4_App_Bike_BlinkMode_TURN_LEFT) {
			if (countDown % 100) {
				for(int i=0;i<RGB_BUFFER_SIZE;i+=4) {
					msGlobals.ggRGBLEDBuf[i] = msGlobals.ggBrightness | 0xe0;
					msGlobals.ggRGBLEDBuf[i+1] = i < 32 ? 255 : 255;
					msGlobals.ggRGBLEDBuf[i+2] = i < 32 ? 255 : 0;
					msGlobals.ggRGBLEDBuf[i+3] = i < 32 ? 255 : 0;
				}
			} else {
				for(int i=0;i<RGB_BUFFER_SIZE;i+=4) {
					msGlobals.ggRGBLEDBuf[i] = msGlobals.ggBrightness | 0xe0;
					msGlobals.ggRGBLEDBuf[i+1] = i < 32 ? 255 : 126;
					msGlobals.ggRGBLEDBuf[i+2] = i < 32 ? 255 : 255;
					msGlobals.ggRGBLEDBuf[i+3] = i < 32 ? 255 : 255;
				}
			}

		}

		if (_bike.blink_mode == MS4_App_Bike_BlinkMode_TURN_RIGHT) {
			if (countDown % 100) {
				for(int i=0;i<RGB_BUFFER_SIZE;i+=4) {
					msGlobals.ggRGBLEDBuf[i] = msGlobals.ggBrightness | 0xe0;
					msGlobals.ggRGBLEDBuf[i+1] = i < 32 ? 255 : 255;
					msGlobals.ggRGBLEDBuf[i+2] = i < 32 ? 0 : 255;
					msGlobals.ggRGBLEDBuf[i+3] = i < 32 ? 0 : 255;
				}
			} else {
				for(int i=0;i<RGB_BUFFER_SIZE;i+=4) {
					msGlobals.ggRGBLEDBuf[i] = msGlobals.ggBrightness | 0xe0;
					msGlobals.ggRGBLEDBuf[i+1] = i < 32 ? 126 : 255;
					msGlobals.ggRGBLEDBuf[i+2] = i < 32 ? 255 : 255;
					msGlobals.ggRGBLEDBuf[i+3] = i < 32 ? 255 : 255;
				}
			}			

		}

		if (_bike.blink_mode != MS4_App_Bike_BlinkMode_NONE_ZERO) {
			countDown--;
		}

		if (countDown <= 0) {
			countDown = 0;
			_bike.blink_mode = MS4_App_Bike_BlinkMode_NONE_ZERO;
		}


#ifdef BIKE_MODE_USE_MQTT
			bikeMQTT.loop();
#endif


		return true;

	}

};

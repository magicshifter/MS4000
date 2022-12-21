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
		// TODO: replace with broker IP
		bikeMQTT.begin("0.0.0.0", bikeNet);
		msSystem.slog("mqtt connecting..");
		while (!bikeMQTT.connect("bike", "public", "public")) {
			msSystem.slog(".");
			delay(500);
		}
#endif

		bikeUDP.begin(8008);

		if (_bike.role == MS4_App_Bike_Role_FRONT_LIGHT) {
			msSystem.slog("leftmode<<");
		} else {
			msSystem.slog("rightmode>>");
		}

#ifdef BIKE_MODE_USE_MQTT
		bikeMQTT.onMessage(messageReceived);
		bikeMQTT.subscribe("/bike");
#endif

	}

	virtual void stop(void) {

#ifdef BIKE_MODE_USE_MQTT
		bikeMQTT.unsubscribe("/bike");
		bikeMQTT.disconnect();
#endif
	}

	void signalLeft() {
		bikeUDP.beginPacket(bikeUDP.remoteIP(), bikeUDP.remotePort());
		bikeUDP.write("left");
		bikeUDP.endPacket();

#ifdef BIKE_MODE_USE_MQTT
			bikeMQTT.publish("/bike", "left");
#endif
	}

	void signalRight() {
		bikeUDP.beginPacket(bikeUDP.remoteIP(), bikeUDP.remotePort());
		bikeUDP.write("right");
		bikeUDP.endPacket();

#ifdef BIKE_MODE_USE_MQTT
			bikeMQTT.publish("/bike", "right");
#endif
	}


	virtual bool step(void) {

		int new_role = _bike.role;
		int blink_mode = _bike.blink_mode;

		int packetSize = bikeUDP.parsePacket();
		
		if (packetSize) {
    		// Serial.printf("Received packet of size %d from %s:%d\n    (to %s:%d, free heap = %d B)\n",
            //       packetSize,
            //       bikeUDP.remoteI().toString().c_str(), bikeUDP.remotePort(),
            //       bikeUDP.destinationIP().toString().c_str(), bikeUDP.localPort(),
            //       ESP.getFreeHeap());

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

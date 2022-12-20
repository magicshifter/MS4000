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

	// buffers for receiving and sending data
	char packetBuffer[UDP_TX_PACKET_MAX_SIZE + 1]; //buffer to hold incoming packet,

#ifdef BIKE_MQTT
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

#ifdef BIKE_MQTT
		// TODO: replace with broker IP
		bikeMQTT.begin("0.0.0.0", bikeNet);
		msSystem.slog("mqtt connecting..");
		while (!bikeMQTT.connect("bike", "public", "public")) {
			msSystem.slog(".");
			delay(500);
		}
#endif

		bikeUDP.begin(8308);

 		if (_bike.role == MS4_App_Bike_Role_FRONT_LIGHT) {
 			msSystem.slog("leftmode<<");
		} else {
 			msSystem.slog("rightmode>>");
		}

#ifdef BIKE_MQTT
		bikeMQTT.onMessage(messageReceived);
		bikeMQTT.subscribe("/bike");
#endif

	}

	virtual void stop(void) {

#ifdef BIKE_MQTT
		bikeMQTT.unsubscribe("/bike");
		bikeMQTT.disconnect();
#endif
	}

	void signalLeft() {
			bikeUDP.beginPacket(bikeUDP.remoteIP(), bikeUDP.remotePort());
			bikeUDP.write("left");
			bikeUDP.endPacket();
	}

	void signalRight() {
			bikeUDP.beginPacket(bikeUDP.remoteIP(), bikeUDP.remotePort());
			bikeUDP.write("right");
			bikeUDP.endPacket();
	}

	virtual bool step(void) {

		int new_role = _bike.role;
		int blink_mode = _bike.blink_mode;
	
		int packetSize = bikeUDP.parsePacket();
		
		if (packetSize) {
    		// Serial.printf("Received packet of size %d from %s:%d\n    (to %s:%d, free heap = %d B)\n",
            //       packetSize,
            //       bikeUDP.remoteIP().toString().c_str(), bikeUDP.remotePort(),
            //       bikeUDP.destinationIP().toString().c_str(), bikeUDP.localPort(),
            //       ESP.getFreeHeap());

			// read the packet into packetBufffer
			int n = bikeUDP.read(packetBuffer, UDP_TX_PACKET_MAX_SIZE);
			packetBuffer[n] = 0;
			Serial.println("Contents:");
			Serial.println(packetBuffer);

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
		}

		if (msSystem.msButtons.msBtnAHit) {	
			blink_mode = MS4_App_Bike_BlinkMode_TURN_LEFT;
#ifdef BIKE_MQTT
			bikeMQTT.publish("/bike", "left");
#endif
			signalLeft();

		}

 		if (msSystem.msButtons.msBtnBLongHit) {
			new_role++;
		}
                                        
		if (msSystem.msButtons.msBtnBHit) {
			blink_mode = MS4_App_Bike_BlinkMode_TURN_RIGHT;
#ifdef BIKE_MQTT
			bikeMQTT.publish("/bike", "right");
#endif

			signalRight();

		}

		if(new_role<MS4_App_Bike_BlinkMode_NONE_ZERO)
			new_role=MS4_App_Bike_BlinkMode_NONE_ZERO;
		if(new_role>MS4_App_Bike_Role_BACK_LIGHT)
			new_role=MS4_App_Bike_Role_FRONT_LIGHT;

		if(blink_mode<MS4_App_Bike_Role_FRONT_LIGHT)
			blink_mode=MS4_App_Bike_Role_BACK_LIGHT;
		if(blink_mode>MS4_App_Bike_Role_BACK_LIGHT)
			blink_mode=MS4_App_Bike_Role_FRONT_LIGHT;

		_bike.role = (MS4_App_Bike_Role)new_role;

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



#ifdef BIKE_MQTT
		bikeMQTT.loop();
#endif
		return true;
	}


};

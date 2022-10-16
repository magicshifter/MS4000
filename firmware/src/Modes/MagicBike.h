/**
 * Magic Bike Mode:
 * 		sub-mode: front
 				bright-white
 					btn-a turn left
 					btn-b turn right
 *		sub-mode; rear
 				if (wifi connected) to front shifter, blink when turning
 *		
**/

class MagicBikeMode : public MagicShifterBaseMode {

private:
	MS3KG_App_Bike &_bike = msGlobals.pbuf.apps.bike;

  public:
  	MagicBikeMode() {
  		modeName = "Bike";
  	}

	virtual void start() {

		if (_bike.role == MS3KG_App_Bike_Role_FRONT_LIGHT) {

			for(int i=0;i<RGB_BUFFER_SIZE;i+=4) {
   	 			msGlobals.ggRGBLEDBuf[i] = msGlobals.ggBrightness | 0xe0;
	   	 		msGlobals.ggRGBLEDBuf[i+1] = i < 32 ? 255 : 0;
   	 			msGlobals.ggRGBLEDBuf[i+2] = i < 32 ? 255 : 0;
   	 			msGlobals.ggRGBLEDBuf[i+3] = i < 32 ? 255 : 255;
			}
		}

	}

	virtual void stop(void) {
	}

	virtual bool step(void) {
		msSystem.msLEDs.loadBuffer(msGlobals.ggRGBLEDBuf);
		msSystem.msLEDs.updateLEDs();
		delay(10);
		return true;
	}
};

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


	}

	virtual void stop(void) {
	}

	virtual bool step(void) {

		int new_role = _bike.role;
		int blink_mode = _bike.blink_mode;
	
		msSystem.msLEDs.loadBuffer(msGlobals.ggRGBLEDBuf);
		msSystem.msLEDs.updateLEDs();
		delay(10);

		if (msSystem.msButtons.msBtnALongHit) {
			new_role--;
		}

		if (msSystem.msButtons.msBtnAHit) {	
			blink_mode = MS3KG_App_Bike_BlinkMode_TURN_LEFT;
		}

 		if (msSystem.msButtons.msBtnBLongHit) {
			new_role++;
		}
                                        
		if (msSystem.msButtons.msBtnBHit) {
			blink_mode = MS3KG_App_Bike_BlinkMode_TURN_RIGHT;
		}

		if(new_role<MS3KG_App_Bike_BlinkMode_NONE_ZERO)
			new_role=MS3KG_App_Bike_BlinkMode_NONE_ZERO;
		if(new_role>MS3KG_App_Bike_Role_BACK_LIGHT)
			new_role=MS3KG_App_Bike_Role_FRONT_LIGHT;

		if(blink_mode<MS3KG_App_Bike_Role_FRONT_LIGHT)
			blink_mode=MS3KG_App_Bike_Role_BACK_LIGHT;
		if(blink_mode>MS3KG_App_Bike_Role_BACK_LIGHT)
			blink_mode=MS3KG_App_Bike_Role_FRONT_LIGHT;

		_bike.role = (MS3KG_App_Bike_Role)new_role;

 		if (_bike.role == MS3KG_App_Bike_Role_FRONT_LIGHT) {

			for(int i=0;i<RGB_BUFFER_SIZE;i+=4) {
   	 			msGlobals.ggRGBLEDBuf[i] = msGlobals.ggBrightness | 0xe0;
	   	 		msGlobals.ggRGBLEDBuf[i+1] = i < 32 ? 255 : 0;
   	 			msGlobals.ggRGBLEDBuf[i+2] = i < 32 ? 255 : 0;
   	 			msGlobals.ggRGBLEDBuf[i+3] = i < 32 ? 255 : 255;
			}
		}

  		if (_bike.role == MS3KG_App_Bike_Role_BACK_LIGHT) {

			for(int i=0;i<RGB_BUFFER_SIZE;i+=4) {
   	 			msGlobals.ggRGBLEDBuf[i] = msGlobals.ggBrightness | 0xe0;
   	 			msGlobals.ggRGBLEDBuf[i+1] = i < 32 ? 255 : 0;
   	 			msGlobals.ggRGBLEDBuf[i+2] = i < 32 ? 255 : 255;
	   	 		msGlobals.ggRGBLEDBuf[i+3] = i < 32 ? 255 : 0;
			}
		}
 
		return true;
	}
};

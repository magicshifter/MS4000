/* Automatically generated nanopb header */
/* Generated by nanopb-0.4.7-dev */

#ifndef PB_MS4_PB_H_INCLUDED
#define PB_MS4_PB_H_INCLUDED
#include <pb.h>

#if PB_PROTO_HEADER_VERSION != 40
#error Regenerate this file with the current version of nanopb generator.
#endif

/* Enum definitions */
typedef enum _MS4_App_T {
    MS4_App_T__Shake = 0,
    MS4_App_T__Light = 1,
    MS4_App_T__Magnet = 2,
    MS4_App_T__System = 3,
    MS4_App_T__Remote = 4,
    MS4_App_T__Beat = 5,
    MS4_App_T__Countdown = 6,
    MS4_App_T__Arpi = 7,
    MS4_App_T__Sequi = 8,
    MS4_App_T__Bike = 9
} MS4_App_T;

typedef enum _MS4_App_Light_Mode {
    MS4_App_Light_Mode_RAINBOW = 0,
    MS4_App_Light_Mode_NORMAL = 1,
    MS4_App_Light_Mode_SCANNER_RGB = 2,
    MS4_App_Light_Mode_SCANNER_BW = 3
} MS4_App_Light_Mode;

typedef enum _MS4_App_Magnet_Mode {
    MS4_App_Magnet_Mode_BARS = 0,
    MS4_App_Magnet_Mode_BARS_DOT = 1,
    MS4_App_Magnet_Mode_DOTS = 2,
    MS4_App_Magnet_Mode_OTHER = 3
} MS4_App_Magnet_Mode;

typedef enum _MS4_App_System_Mode {
    MS4_App_System_Mode_VERSION = 0,
    MS4_App_System_Mode_WIFI = 1,
    MS4_App_System_Mode_SSID = 2,
    MS4_App_System_Mode_IP = 3,
    MS4_App_System_Mode_SOFTIP = 4,
    MS4_App_System_Mode_POWER_LO = 5,
    MS4_App_System_Mode_POWER_HI = 6,
    MS4_App_System_Mode_POWER_VALUE = 7,
    MS4_App_System_Mode_CALIBRATION = 8
} MS4_App_System_Mode;

typedef enum _MS4_App_Beat_Mode {
    MS4_App_Beat_Mode_SIDE = 0,
    MS4_App_Beat_Mode_CENTER = 1
} MS4_App_Beat_Mode;

typedef enum _MS4_App_Countdown_Mode {
    MS4_App_Countdown_Mode_DOWN_1S = 0,
    MS4_App_Countdown_Mode_DOWN_5S = 1,
    MS4_App_Countdown_Mode_DOWN_10S = 2,
    MS4_App_Countdown_Mode_DOWN_30S = 3,
    MS4_App_Countdown_Mode_DOWN_1M = 4,
    MS4_App_Countdown_Mode_DOWN_5M = 5,
    MS4_App_Countdown_Mode_DOWN_10M = 6,
    MS4_App_Countdown_Mode_DOWN_30M = 7
} MS4_App_Countdown_Mode;

typedef enum _MS4_App_Arpi_Mode {
    MS4_App_Arpi_Mode_ARP1 = 0,
    MS4_App_Arpi_Mode_ARP2 = 1,
    MS4_App_Arpi_Mode_ARP3 = 2,
    MS4_App_Arpi_Mode_ARP4 = 3,
    MS4_App_Arpi_Mode_ARP5 = 4,
    MS4_App_Arpi_Mode_ARP6 = 5,
    MS4_App_Arpi_Mode_ARP7 = 6,
    MS4_App_Arpi_Mode_ARP8 = 7
} MS4_App_Arpi_Mode;

typedef enum _MS4_App_Bike_Role {
    MS4_App_Bike_Role_FRONT_LIGHT = 0,
    MS4_App_Bike_Role_BACK_LIGHT = 1
} MS4_App_Bike_Role;

typedef enum _MS4_App_Bike_BlinkMode {
    MS4_App_Bike_BlinkMode_NONE_ZERO = 0,
    MS4_App_Bike_BlinkMode_RED_WHITE = 1,
    MS4_App_Bike_BlinkMode_RED_SYNC = 2,
    MS4_App_Bike_BlinkMode_TURN_LEFT = 3,
    MS4_App_Bike_BlinkMode_TURN_RIGHT = 4
} MS4_App_Bike_BlinkMode;

typedef enum _MS4_App_Bike_TapMode {
    MS4_App_Bike_TapMode_BUTTONS = 0,
    MS4_App_Bike_TapMode_ONE_TWO = 1,
    MS4_App_Bike_TapMode_LEFT_RIGHT = 2
} MS4_App_Bike_TapMode;

/* Struct definitions */
typedef struct _MS4_App_Remote {
    char dummy_field;
} MS4_App_Remote;

typedef struct _MS4_Config {
    char dummy_field;
} MS4_Config;

typedef struct _MS4_Config_UI {
    pb_callback_t uiSettings;
    pb_callback_t calibration;
} MS4_Config_UI;

typedef struct _MS4_Config_wifiAP {
    pb_callback_t ssid;
    pb_callback_t password;
    pb_callback_t preferred;
    pb_callback_t server;
    pb_callback_t apList;
} MS4_Config_wifiAP;

typedef struct _MIDI_INTERVALS {
    int32_t v;
} MIDI_INTERVALS;

typedef struct _MIDI_OCTAVE {
    int32_t o;
} MIDI_OCTAVE;

typedef struct _MS4_App_Arpi {
    bool has_mode;
    MS4_App_Arpi_Mode mode;
} MS4_App_Arpi;

typedef struct _MS4_App_Bike {
    bool has_role;
    MS4_App_Bike_Role role;
    pb_callback_t front_wifiname;
    pb_callback_t back_wifiname;
    bool has_blink_mode;
    MS4_App_Bike_BlinkMode blink_mode;
    bool has_tap_mode;
    MS4_App_Bike_TapMode tap_mode;
} MS4_App_Bike;

typedef struct _MS4_App_Countdown {
    bool has_mode;
    MS4_App_Countdown_Mode mode;
} MS4_App_Countdown;

typedef struct _MS4_App_Magnet {
    bool has_mode;
    MS4_App_Magnet_Mode mode;
} MS4_App_Magnet;

typedef struct _MS4_App_Shake {
    pb_callback_t image;
    bool has_colorIndex;
    int32_t colorIndex;
    bool has_bounce;
    int32_t bounce;
} MS4_App_Shake;

typedef struct _MS4_App_System {
    bool has_mode;
    MS4_App_System_Mode mode;
} MS4_App_System;

typedef struct _MS4_App_Updater {
    bool has_shouldReset;
    int32_t shouldReset;
} MS4_App_Updater;

typedef struct _RGB {
    int32_t R;
    int32_t G;
    int32_t B;
} RGB;

typedef struct _MIDI_STEP {
    MIDI_INTERVALS interval;
    MIDI_OCTAVE octave;
    int32_t mode;
} MIDI_STEP;

typedef struct _MS4_App_Beat {
    bool has_mode;
    MS4_App_Beat_Mode mode;
    bool has_sensitivity;
    int32_t sensitivity;
    bool has_color;
    RGB color;
} MS4_App_Beat;

typedef struct _MS4_App_Light {
    bool has_mode;
    MS4_App_Light_Mode mode;
    bool has_color;
    RGB color;
    bool has_colorIndex;
    int32_t colorIndex;
    bool has_triggerSpeed;
    int32_t triggerSpeed;
} MS4_App_Light;

typedef struct _MIDI_SEQUENCE {
    pb_size_t steps_count;
    MIDI_STEP steps[8];
} MIDI_SEQUENCE;

typedef struct _MS4_App_Sequi {
    bool has_sequence;
    MIDI_SEQUENCE sequence;
} MS4_App_Sequi;

typedef struct _MS4_App {
    bool has_current;
    MS4_App_T current;
    bool has_shake;
    MS4_App_Shake shake;
    bool has_light;
    MS4_App_Light light;
    bool has_magnet;
    MS4_App_Magnet magnet;
    bool has_system;
    MS4_App_System system;
    bool has_remote;
    MS4_App_Remote remote;
    bool has_beat;
    MS4_App_Beat beat;
    bool has_countdown;
    MS4_App_Countdown countdown;
    bool has_arpi;
    MS4_App_Arpi arpi;
    bool has_bike;
    MS4_App_Bike bike;
    bool has_sequi;
    MS4_App_Sequi sequi;
    bool has_updater;
    MS4_App_Updater updater;
} MS4_App;

typedef struct _MS4 {
    bool has_apps;
    MS4_App apps;
} MS4;


/* Helper constants for enums */
#define _MS4_App_T_MIN MS4_App_T__Shake
#define _MS4_App_T_MAX MS4_App_T__Bike
#define _MS4_App_T_ARRAYSIZE ((MS4_App_T)(MS4_App_T__Bike+1))

#define _MS4_App_Light_Mode_MIN MS4_App_Light_Mode_RAINBOW
#define _MS4_App_Light_Mode_MAX MS4_App_Light_Mode_SCANNER_BW
#define _MS4_App_Light_Mode_ARRAYSIZE ((MS4_App_Light_Mode)(MS4_App_Light_Mode_SCANNER_BW+1))

#define _MS4_App_Magnet_Mode_MIN MS4_App_Magnet_Mode_BARS
#define _MS4_App_Magnet_Mode_MAX MS4_App_Magnet_Mode_OTHER
#define _MS4_App_Magnet_Mode_ARRAYSIZE ((MS4_App_Magnet_Mode)(MS4_App_Magnet_Mode_OTHER+1))

#define _MS4_App_System_Mode_MIN MS4_App_System_Mode_VERSION
#define _MS4_App_System_Mode_MAX MS4_App_System_Mode_CALIBRATION
#define _MS4_App_System_Mode_ARRAYSIZE ((MS4_App_System_Mode)(MS4_App_System_Mode_CALIBRATION+1))

#define _MS4_App_Beat_Mode_MIN MS4_App_Beat_Mode_SIDE
#define _MS4_App_Beat_Mode_MAX MS4_App_Beat_Mode_CENTER
#define _MS4_App_Beat_Mode_ARRAYSIZE ((MS4_App_Beat_Mode)(MS4_App_Beat_Mode_CENTER+1))

#define _MS4_App_Countdown_Mode_MIN MS4_App_Countdown_Mode_DOWN_1S
#define _MS4_App_Countdown_Mode_MAX MS4_App_Countdown_Mode_DOWN_30M
#define _MS4_App_Countdown_Mode_ARRAYSIZE ((MS4_App_Countdown_Mode)(MS4_App_Countdown_Mode_DOWN_30M+1))

#define _MS4_App_Arpi_Mode_MIN MS4_App_Arpi_Mode_ARP1
#define _MS4_App_Arpi_Mode_MAX MS4_App_Arpi_Mode_ARP8
#define _MS4_App_Arpi_Mode_ARRAYSIZE ((MS4_App_Arpi_Mode)(MS4_App_Arpi_Mode_ARP8+1))

#define _MS4_App_Bike_Role_MIN MS4_App_Bike_Role_FRONT_LIGHT
#define _MS4_App_Bike_Role_MAX MS4_App_Bike_Role_BACK_LIGHT
#define _MS4_App_Bike_Role_ARRAYSIZE ((MS4_App_Bike_Role)(MS4_App_Bike_Role_BACK_LIGHT+1))

#define _MS4_App_Bike_BlinkMode_MIN MS4_App_Bike_BlinkMode_NONE_ZERO
#define _MS4_App_Bike_BlinkMode_MAX MS4_App_Bike_BlinkMode_TURN_RIGHT
#define _MS4_App_Bike_BlinkMode_ARRAYSIZE ((MS4_App_Bike_BlinkMode)(MS4_App_Bike_BlinkMode_TURN_RIGHT+1))

#define _MS4_App_Bike_TapMode_MIN MS4_App_Bike_TapMode_BUTTONS
#define _MS4_App_Bike_TapMode_MAX MS4_App_Bike_TapMode_LEFT_RIGHT
#define _MS4_App_Bike_TapMode_ARRAYSIZE ((MS4_App_Bike_TapMode)(MS4_App_Bike_TapMode_LEFT_RIGHT+1))










#define MS4_App_current_ENUMTYPE MS4_App_T


#define MS4_App_Light_mode_ENUMTYPE MS4_App_Light_Mode

#define MS4_App_Magnet_mode_ENUMTYPE MS4_App_Magnet_Mode

#define MS4_App_System_mode_ENUMTYPE MS4_App_System_Mode


#define MS4_App_Beat_mode_ENUMTYPE MS4_App_Beat_Mode

#define MS4_App_Countdown_mode_ENUMTYPE MS4_App_Countdown_Mode

#define MS4_App_Arpi_mode_ENUMTYPE MS4_App_Arpi_Mode

#define MS4_App_Bike_role_ENUMTYPE MS4_App_Bike_Role
#define MS4_App_Bike_blink_mode_ENUMTYPE MS4_App_Bike_BlinkMode
#define MS4_App_Bike_tap_mode_ENUMTYPE MS4_App_Bike_TapMode




#ifdef __cplusplus
extern "C" {
#endif

/* Initializer values for message structs */
#define RGB_init_default                         {255, 5, 5}
#define MIDI_OCTAVE_init_default                 {5}
#define MIDI_INTERVALS_init_default              {0}
#define MIDI_STEP_init_default                   {MIDI_INTERVALS_init_default, MIDI_OCTAVE_init_default, 0}
#define MIDI_SEQUENCE_init_default               {0, {MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default}}
#define MS4_init_default                         {false, MS4_App_init_default}
#define MS4_Config_init_default                  {0}
#define MS4_Config_UI_init_default               {{{NULL}, NULL}, {{NULL}, NULL}}
#define MS4_Config_wifiAP_init_default           {{{NULL}, NULL}, {{NULL}, NULL}, {{NULL}, NULL}, {{NULL}, NULL}, {{NULL}, NULL}}
#define MS4_App_init_default                     {false, _MS4_App_T_MIN, false, MS4_App_Shake_init_default, false, MS4_App_Light_init_default, false, MS4_App_Magnet_init_default, false, MS4_App_System_init_default, false, MS4_App_Remote_init_default, false, MS4_App_Beat_init_default, false, MS4_App_Countdown_init_default, false, MS4_App_Arpi_init_default, false, MS4_App_Bike_init_default, false, MS4_App_Sequi_init_default, false, MS4_App_Updater_init_default}
#define MS4_App_Shake_init_default               {{{NULL}, NULL}, false, 0, false, 0}
#define MS4_App_Light_init_default               {false, MS4_App_Light_Mode_RAINBOW, false, RGB_init_default, false, 0, false, 0}
#define MS4_App_Magnet_init_default              {false, MS4_App_Magnet_Mode_BARS}
#define MS4_App_System_init_default              {false, MS4_App_System_Mode_VERSION}
#define MS4_App_Remote_init_default              {0}
#define MS4_App_Beat_init_default                {false, MS4_App_Beat_Mode_CENTER, false, 2, false, RGB_init_default}
#define MS4_App_Countdown_init_default           {false, MS4_App_Countdown_Mode_DOWN_1M}
#define MS4_App_Arpi_init_default                {false, MS4_App_Arpi_Mode_ARP8}
#define MS4_App_Bike_init_default                {false, _MS4_App_Bike_Role_MIN, {{NULL}, NULL}, {{NULL}, NULL}, false, _MS4_App_Bike_BlinkMode_MIN, false, _MS4_App_Bike_TapMode_MIN}
#define MS4_App_Sequi_init_default               {false, MIDI_SEQUENCE_init_default}
#define MS4_App_Updater_init_default             {false, 0}
#define RGB_init_zero                            {0, 0, 0}
#define MIDI_OCTAVE_init_zero                    {0}
#define MIDI_INTERVALS_init_zero                 {0}
#define MIDI_STEP_init_zero                      {MIDI_INTERVALS_init_zero, MIDI_OCTAVE_init_zero, 0}
#define MIDI_SEQUENCE_init_zero                  {0, {MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero}}
#define MS4_init_zero                            {false, MS4_App_init_zero}
#define MS4_Config_init_zero                     {0}
#define MS4_Config_UI_init_zero                  {{{NULL}, NULL}, {{NULL}, NULL}}
#define MS4_Config_wifiAP_init_zero              {{{NULL}, NULL}, {{NULL}, NULL}, {{NULL}, NULL}, {{NULL}, NULL}, {{NULL}, NULL}}
#define MS4_App_init_zero                        {false, _MS4_App_T_MIN, false, MS4_App_Shake_init_zero, false, MS4_App_Light_init_zero, false, MS4_App_Magnet_init_zero, false, MS4_App_System_init_zero, false, MS4_App_Remote_init_zero, false, MS4_App_Beat_init_zero, false, MS4_App_Countdown_init_zero, false, MS4_App_Arpi_init_zero, false, MS4_App_Bike_init_zero, false, MS4_App_Sequi_init_zero, false, MS4_App_Updater_init_zero}
#define MS4_App_Shake_init_zero                  {{{NULL}, NULL}, false, 0, false, 0}
#define MS4_App_Light_init_zero                  {false, _MS4_App_Light_Mode_MIN, false, RGB_init_zero, false, 0, false, 0}
#define MS4_App_Magnet_init_zero                 {false, _MS4_App_Magnet_Mode_MIN}
#define MS4_App_System_init_zero                 {false, _MS4_App_System_Mode_MIN}
#define MS4_App_Remote_init_zero                 {0}
#define MS4_App_Beat_init_zero                   {false, _MS4_App_Beat_Mode_MIN, false, 0, false, RGB_init_zero}
#define MS4_App_Countdown_init_zero              {false, _MS4_App_Countdown_Mode_MIN}
#define MS4_App_Arpi_init_zero                   {false, _MS4_App_Arpi_Mode_MIN}
#define MS4_App_Bike_init_zero                   {false, _MS4_App_Bike_Role_MIN, {{NULL}, NULL}, {{NULL}, NULL}, false, _MS4_App_Bike_BlinkMode_MIN, false, _MS4_App_Bike_TapMode_MIN}
#define MS4_App_Sequi_init_zero                  {false, MIDI_SEQUENCE_init_zero}
#define MS4_App_Updater_init_zero                {false, 0}

/* Field tags (for use in manual encoding/decoding) */
#define MS4_Config_UI_uiSettings_tag             1
#define MS4_Config_UI_calibration_tag            2
#define MS4_Config_wifiAP_ssid_tag               1
#define MS4_Config_wifiAP_password_tag           2
#define MS4_Config_wifiAP_preferred_tag          3
#define MS4_Config_wifiAP_server_tag             4
#define MS4_Config_wifiAP_apList_tag             5
#define MIDI_INTERVALS_v_tag                     1
#define MIDI_OCTAVE_o_tag                        1
#define MS4_App_Arpi_mode_tag                    1
#define MS4_App_Bike_role_tag                    1
#define MS4_App_Bike_front_wifiname_tag          2
#define MS4_App_Bike_back_wifiname_tag           3
#define MS4_App_Bike_blink_mode_tag              4
#define MS4_App_Bike_tap_mode_tag                5
#define MS4_App_Countdown_mode_tag               1
#define MS4_App_Magnet_mode_tag                  1
#define MS4_App_Shake_image_tag                  1
#define MS4_App_Shake_colorIndex_tag             2
#define MS4_App_Shake_bounce_tag                 3
#define MS4_App_System_mode_tag                  1
#define MS4_App_Updater_shouldReset_tag          1
#define RGB_R_tag                                1
#define RGB_G_tag                                2
#define RGB_B_tag                                3
#define MIDI_STEP_interval_tag                   1
#define MIDI_STEP_octave_tag                     2
#define MIDI_STEP_mode_tag                       3
#define MS4_App_Beat_mode_tag                    1
#define MS4_App_Beat_sensitivity_tag             2
#define MS4_App_Beat_color_tag                   3
#define MS4_App_Light_mode_tag                   1
#define MS4_App_Light_color_tag                  2
#define MS4_App_Light_colorIndex_tag             3
#define MS4_App_Light_triggerSpeed_tag           4
#define MIDI_SEQUENCE_steps_tag                  1
#define MS4_App_Sequi_sequence_tag               1
#define MS4_App_current_tag                      1
#define MS4_App_shake_tag                        2
#define MS4_App_light_tag                        3
#define MS4_App_magnet_tag                       4
#define MS4_App_system_tag                       5
#define MS4_App_remote_tag                       6
#define MS4_App_beat_tag                         7
#define MS4_App_countdown_tag                    8
#define MS4_App_arpi_tag                         9
#define MS4_App_bike_tag                         10
#define MS4_App_sequi_tag                        11
#define MS4_App_updater_tag                      12
#define MS4_apps_tag                             1

/* Struct field encoding specification for nanopb */
#define RGB_FIELDLIST(X, a) \
X(a, STATIC,   REQUIRED, INT32,    R,                 1) \
X(a, STATIC,   REQUIRED, INT32,    G,                 2) \
X(a, STATIC,   REQUIRED, INT32,    B,                 3)
#define RGB_CALLBACK NULL
#define RGB_DEFAULT (const pb_byte_t*)"\x08\xff\x01\x10\x79\x18\x00\x00"

#define MIDI_OCTAVE_FIELDLIST(X, a) \
X(a, STATIC,   REQUIRED, INT32,    o,                 1)
#define MIDI_OCTAVE_CALLBACK NULL
#define MIDI_OCTAVE_DEFAULT (const pb_byte_t*)"\x08\x05\x00"

#define MIDI_INTERVALS_FIELDLIST(X, a) \
X(a, STATIC,   REQUIRED, INT32,    v,                 1)
#define MIDI_INTERVALS_CALLBACK NULL
#define MIDI_INTERVALS_DEFAULT (const pb_byte_t*)"\x08\x00\x00"

#define MIDI_STEP_FIELDLIST(X, a) \
X(a, STATIC,   REQUIRED, MESSAGE,  interval,          1) \
X(a, STATIC,   REQUIRED, MESSAGE,  octave,            2) \
X(a, STATIC,   REQUIRED, INT32,    mode,              3)
#define MIDI_STEP_CALLBACK NULL
#define MIDI_STEP_DEFAULT NULL
#define MIDI_STEP_interval_MSGTYPE MIDI_INTERVALS
#define MIDI_STEP_octave_MSGTYPE MIDI_OCTAVE

#define MIDI_SEQUENCE_FIELDLIST(X, a) \
X(a, STATIC,   REPEATED, MESSAGE,  steps,             1)
#define MIDI_SEQUENCE_CALLBACK NULL
#define MIDI_SEQUENCE_DEFAULT NULL
#define MIDI_SEQUENCE_steps_MSGTYPE MIDI_STEP

#define MS4_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, MESSAGE,  apps,              1)
#define MS4_CALLBACK NULL
#define MS4_DEFAULT NULL
#define MS4_apps_MSGTYPE MS4_App

#define MS4_Config_FIELDLIST(X, a) \

#define MS4_Config_CALLBACK NULL
#define MS4_Config_DEFAULT NULL

#define MS4_Config_UI_FIELDLIST(X, a) \
X(a, CALLBACK, OPTIONAL, STRING,   uiSettings,        1) \
X(a, CALLBACK, OPTIONAL, STRING,   calibration,       2)
#define MS4_Config_UI_CALLBACK pb_default_field_callback
#define MS4_Config_UI_DEFAULT NULL

#define MS4_Config_wifiAP_FIELDLIST(X, a) \
X(a, CALLBACK, OPTIONAL, STRING,   ssid,              1) \
X(a, CALLBACK, OPTIONAL, STRING,   password,          2) \
X(a, CALLBACK, OPTIONAL, STRING,   preferred,         3) \
X(a, CALLBACK, OPTIONAL, STRING,   server,            4) \
X(a, CALLBACK, OPTIONAL, STRING,   apList,            5)
#define MS4_Config_wifiAP_CALLBACK pb_default_field_callback
#define MS4_Config_wifiAP_DEFAULT NULL

#define MS4_App_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, UENUM,    current,           1) \
X(a, STATIC,   OPTIONAL, MESSAGE,  shake,             2) \
X(a, STATIC,   OPTIONAL, MESSAGE,  light,             3) \
X(a, STATIC,   OPTIONAL, MESSAGE,  magnet,            4) \
X(a, STATIC,   OPTIONAL, MESSAGE,  system,            5) \
X(a, STATIC,   OPTIONAL, MESSAGE,  remote,            6) \
X(a, STATIC,   OPTIONAL, MESSAGE,  beat,              7) \
X(a, STATIC,   OPTIONAL, MESSAGE,  countdown,         8) \
X(a, STATIC,   OPTIONAL, MESSAGE,  arpi,              9) \
X(a, STATIC,   OPTIONAL, MESSAGE,  bike,             10) \
X(a, STATIC,   OPTIONAL, MESSAGE,  sequi,            11) \
X(a, STATIC,   OPTIONAL, MESSAGE,  updater,          12)
#define MS4_App_CALLBACK NULL
#define MS4_App_DEFAULT NULL
#define MS4_App_shake_MSGTYPE MS4_App_Shake
#define MS4_App_light_MSGTYPE MS4_App_Light
#define MS4_App_magnet_MSGTYPE MS4_App_Magnet
#define MS4_App_system_MSGTYPE MS4_App_System
#define MS4_App_remote_MSGTYPE MS4_App_Remote
#define MS4_App_beat_MSGTYPE MS4_App_Beat
#define MS4_App_countdown_MSGTYPE MS4_App_Countdown
#define MS4_App_arpi_MSGTYPE MS4_App_Arpi
#define MS4_App_bike_MSGTYPE MS4_App_Bike
#define MS4_App_sequi_MSGTYPE MS4_App_Sequi
#define MS4_App_updater_MSGTYPE MS4_App_Updater

#define MS4_App_Shake_FIELDLIST(X, a) \
X(a, CALLBACK, OPTIONAL, STRING,   image,             1) \
X(a, STATIC,   OPTIONAL, INT32,    colorIndex,        2) \
X(a, STATIC,   OPTIONAL, INT32,    bounce,            3)
#define MS4_App_Shake_CALLBACK pb_default_field_callback
#define MS4_App_Shake_DEFAULT NULL

#define MS4_App_Light_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, UENUM,    mode,              1) \
X(a, STATIC,   OPTIONAL, MESSAGE,  color,             2) \
X(a, STATIC,   OPTIONAL, INT32,    colorIndex,        3) \
X(a, STATIC,   OPTIONAL, INT32,    triggerSpeed,      4)
#define MS4_App_Light_CALLBACK NULL
#define MS4_App_Light_DEFAULT NULL
#define MS4_App_Light_color_MSGTYPE RGB

#define MS4_App_Magnet_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, UENUM,    mode,              1)
#define MS4_App_Magnet_CALLBACK NULL
#define MS4_App_Magnet_DEFAULT NULL

#define MS4_App_System_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, UENUM,    mode,              1)
#define MS4_App_System_CALLBACK NULL
#define MS4_App_System_DEFAULT NULL

#define MS4_App_Remote_FIELDLIST(X, a) \

#define MS4_App_Remote_CALLBACK NULL
#define MS4_App_Remote_DEFAULT NULL

#define MS4_App_Beat_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, UENUM,    mode,              1) \
X(a, STATIC,   OPTIONAL, INT32,    sensitivity,       2) \
X(a, STATIC,   OPTIONAL, MESSAGE,  color,             3)
#define MS4_App_Beat_CALLBACK NULL
#define MS4_App_Beat_DEFAULT (const pb_byte_t*)"\x10\x02\x00"
#define MS4_App_Beat_color_MSGTYPE RGB

#define MS4_App_Countdown_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, UENUM,    mode,              1)
#define MS4_App_Countdown_CALLBACK NULL
#define MS4_App_Countdown_DEFAULT (const pb_byte_t*)"\x08\x04\x00"

#define MS4_App_Arpi_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, UENUM,    mode,              1)
#define MS4_App_Arpi_CALLBACK NULL
#define MS4_App_Arpi_DEFAULT (const pb_byte_t*)"\x08\x07\x00"

#define MS4_App_Bike_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, UENUM,    role,              1) \
X(a, CALLBACK, OPTIONAL, STRING,   front_wifiname,    2) \
X(a, CALLBACK, OPTIONAL, STRING,   back_wifiname,     3) \
X(a, STATIC,   OPTIONAL, UENUM,    blink_mode,        4) \
X(a, STATIC,   OPTIONAL, UENUM,    tap_mode,          5)
#define MS4_App_Bike_CALLBACK pb_default_field_callback
#define MS4_App_Bike_DEFAULT NULL

#define MS4_App_Sequi_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, MESSAGE,  sequence,          1)
#define MS4_App_Sequi_CALLBACK NULL
#define MS4_App_Sequi_DEFAULT NULL
#define MS4_App_Sequi_sequence_MSGTYPE MIDI_SEQUENCE

#define MS4_App_Updater_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, INT32,    shouldReset,       1)
#define MS4_App_Updater_CALLBACK NULL
#define MS4_App_Updater_DEFAULT NULL

extern const pb_msgdesc_t RGB_msg;
extern const pb_msgdesc_t MIDI_OCTAVE_msg;
extern const pb_msgdesc_t MIDI_INTERVALS_msg;
extern const pb_msgdesc_t MIDI_STEP_msg;
extern const pb_msgdesc_t MIDI_SEQUENCE_msg;
extern const pb_msgdesc_t MS4_msg;
extern const pb_msgdesc_t MS4_Config_msg;
extern const pb_msgdesc_t MS4_Config_UI_msg;
extern const pb_msgdesc_t MS4_Config_wifiAP_msg;
extern const pb_msgdesc_t MS4_App_msg;
extern const pb_msgdesc_t MS4_App_Shake_msg;
extern const pb_msgdesc_t MS4_App_Light_msg;
extern const pb_msgdesc_t MS4_App_Magnet_msg;
extern const pb_msgdesc_t MS4_App_System_msg;
extern const pb_msgdesc_t MS4_App_Remote_msg;
extern const pb_msgdesc_t MS4_App_Beat_msg;
extern const pb_msgdesc_t MS4_App_Countdown_msg;
extern const pb_msgdesc_t MS4_App_Arpi_msg;
extern const pb_msgdesc_t MS4_App_Bike_msg;
extern const pb_msgdesc_t MS4_App_Sequi_msg;
extern const pb_msgdesc_t MS4_App_Updater_msg;

/* Defines for backwards compatibility with code written before nanopb-0.4.0 */
#define RGB_fields &RGB_msg
#define MIDI_OCTAVE_fields &MIDI_OCTAVE_msg
#define MIDI_INTERVALS_fields &MIDI_INTERVALS_msg
#define MIDI_STEP_fields &MIDI_STEP_msg
#define MIDI_SEQUENCE_fields &MIDI_SEQUENCE_msg
#define MS4_fields &MS4_msg
#define MS4_Config_fields &MS4_Config_msg
#define MS4_Config_UI_fields &MS4_Config_UI_msg
#define MS4_Config_wifiAP_fields &MS4_Config_wifiAP_msg
#define MS4_App_fields &MS4_App_msg
#define MS4_App_Shake_fields &MS4_App_Shake_msg
#define MS4_App_Light_fields &MS4_App_Light_msg
#define MS4_App_Magnet_fields &MS4_App_Magnet_msg
#define MS4_App_System_fields &MS4_App_System_msg
#define MS4_App_Remote_fields &MS4_App_Remote_msg
#define MS4_App_Beat_fields &MS4_App_Beat_msg
#define MS4_App_Countdown_fields &MS4_App_Countdown_msg
#define MS4_App_Arpi_fields &MS4_App_Arpi_msg
#define MS4_App_Bike_fields &MS4_App_Bike_msg
#define MS4_App_Sequi_fields &MS4_App_Sequi_msg
#define MS4_App_Updater_fields &MS4_App_Updater_msg

/* Maximum encoded size of messages (where known) */
/* MS4_size depends on runtime parameters */
/* MS4_Config_UI_size depends on runtime parameters */
/* MS4_Config_wifiAP_size depends on runtime parameters */
/* MS4_App_size depends on runtime parameters */
/* MS4_App_Shake_size depends on runtime parameters */
/* MS4_App_Bike_size depends on runtime parameters */
#define MIDI_INTERVALS_size                      11
#define MIDI_OCTAVE_size                         11
#define MIDI_SEQUENCE_size                       312
#define MIDI_STEP_size                           37
#define MS4_App_Arpi_size                        2
#define MS4_App_Beat_size                        48
#define MS4_App_Countdown_size                   2
#define MS4_App_Light_size                       59
#define MS4_App_Magnet_size                      2
#define MS4_App_Remote_size                      0
#define MS4_App_Sequi_size                       315
#define MS4_App_System_size                      2
#define MS4_App_Updater_size                     11
#define MS4_Config_size                          0
#define RGB_size                                 33

#ifdef __cplusplus
} /* extern "C" */
#endif

#endif

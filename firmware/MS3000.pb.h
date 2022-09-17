/* Automatically generated nanopb header */
/* Generated by nanopb-0.3.9.2 at Wed Sep  7 13:15:58 2022. */

#ifndef PB_MS3000_PB_H_INCLUDED
#define PB_MS3000_PB_H_INCLUDED
#include <pb.h>

/* @@protoc_insertion_point(includes) */
#if PB_PROTO_HEADER_VERSION != 30
#error Regenerate this file with the current version of nanopb generator.
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* Enum definitions */
typedef enum _MS3KG_App_T {
    MS3KG_App_T__Shake = 0,
    MS3KG_App_T__Light = 1,
    MS3KG_App_T__Magnet = 2,
    MS3KG_App_T__System = 3,
    MS3KG_App_T__Remote = 4,
    MS3KG_App_T__Beat = 5,
    MS3KG_App_T__Countdown = 6,
    MS3KG_App_T__Arpi = 7,
    MS3KG_App_T__Sequi = 8
} MS3KG_App_T;
#define _MS3KG_App_T_MIN MS3KG_App_T__Shake
#define _MS3KG_App_T_MAX MS3KG_App_T__Sequi
#define _MS3KG_App_T_ARRAYSIZE ((MS3KG_App_T)(MS3KG_App_T__Sequi+1))

typedef enum _MS3KG_App_Light_Mode {
    MS3KG_App_Light_Mode_RAINBOW = 0,
    MS3KG_App_Light_Mode_NORMAL = 1,
    MS3KG_App_Light_Mode_SCANNER_RGB = 2,
    MS3KG_App_Light_Mode_SCANNER_BW = 3
} MS3KG_App_Light_Mode;
#define _MS3KG_App_Light_Mode_MIN MS3KG_App_Light_Mode_RAINBOW
#define _MS3KG_App_Light_Mode_MAX MS3KG_App_Light_Mode_SCANNER_BW
#define _MS3KG_App_Light_Mode_ARRAYSIZE ((MS3KG_App_Light_Mode)(MS3KG_App_Light_Mode_SCANNER_BW+1))

typedef enum _MS3KG_App_Magnet_Mode {
    MS3KG_App_Magnet_Mode_BARS = 0,
    MS3KG_App_Magnet_Mode_BARS_DOT = 1,
    MS3KG_App_Magnet_Mode_DOTS = 2,
    MS3KG_App_Magnet_Mode_OTHER = 3
} MS3KG_App_Magnet_Mode;
#define _MS3KG_App_Magnet_Mode_MIN MS3KG_App_Magnet_Mode_BARS
#define _MS3KG_App_Magnet_Mode_MAX MS3KG_App_Magnet_Mode_OTHER
#define _MS3KG_App_Magnet_Mode_ARRAYSIZE ((MS3KG_App_Magnet_Mode)(MS3KG_App_Magnet_Mode_OTHER+1))

typedef enum _MS3KG_App_System_Mode {
    MS3KG_App_System_Mode_VERSION = 0,
    MS3KG_App_System_Mode_WIFI = 1,
    MS3KG_App_System_Mode_SSID = 2,
    MS3KG_App_System_Mode_IP = 3,
    MS3KG_App_System_Mode_SOFTIP = 4,
    MS3KG_App_System_Mode_POWER_LO = 5,
    MS3KG_App_System_Mode_POWER_HI = 6,
    MS3KG_App_System_Mode_POWER_VALUE = 7,
    MS3KG_App_System_Mode_CALIBRATION = 8
} MS3KG_App_System_Mode;
#define _MS3KG_App_System_Mode_MIN MS3KG_App_System_Mode_VERSION
#define _MS3KG_App_System_Mode_MAX MS3KG_App_System_Mode_CALIBRATION
#define _MS3KG_App_System_Mode_ARRAYSIZE ((MS3KG_App_System_Mode)(MS3KG_App_System_Mode_CALIBRATION+1))

typedef enum _MS3KG_App_Beat_Mode {
    MS3KG_App_Beat_Mode_SIDE = 0,
    MS3KG_App_Beat_Mode_CENTER = 1
} MS3KG_App_Beat_Mode;
#define _MS3KG_App_Beat_Mode_MIN MS3KG_App_Beat_Mode_SIDE
#define _MS3KG_App_Beat_Mode_MAX MS3KG_App_Beat_Mode_CENTER
#define _MS3KG_App_Beat_Mode_ARRAYSIZE ((MS3KG_App_Beat_Mode)(MS3KG_App_Beat_Mode_CENTER+1))

typedef enum _MS3KG_App_Countdown_Mode {
    MS3KG_App_Countdown_Mode_DOWN_1S = 0,
    MS3KG_App_Countdown_Mode_DOWN_5S = 1,
    MS3KG_App_Countdown_Mode_DOWN_10S = 2,
    MS3KG_App_Countdown_Mode_DOWN_30S = 3,
    MS3KG_App_Countdown_Mode_DOWN_1M = 4,
    MS3KG_App_Countdown_Mode_DOWN_5M = 5,
    MS3KG_App_Countdown_Mode_DOWN_10M = 6,
    MS3KG_App_Countdown_Mode_DOWN_30M = 7
} MS3KG_App_Countdown_Mode;
#define _MS3KG_App_Countdown_Mode_MIN MS3KG_App_Countdown_Mode_DOWN_1S
#define _MS3KG_App_Countdown_Mode_MAX MS3KG_App_Countdown_Mode_DOWN_30M
#define _MS3KG_App_Countdown_Mode_ARRAYSIZE ((MS3KG_App_Countdown_Mode)(MS3KG_App_Countdown_Mode_DOWN_30M+1))

typedef enum _MS3KG_App_Arpi_Mode {
    MS3KG_App_Arpi_Mode_ARP1 = 0,
    MS3KG_App_Arpi_Mode_ARP2 = 1,
    MS3KG_App_Arpi_Mode_ARP3 = 2,
    MS3KG_App_Arpi_Mode_ARP4 = 3,
    MS3KG_App_Arpi_Mode_ARP5 = 4,
    MS3KG_App_Arpi_Mode_ARP6 = 5,
    MS3KG_App_Arpi_Mode_ARP7 = 6,
    MS3KG_App_Arpi_Mode_ARP8 = 7
} MS3KG_App_Arpi_Mode;
#define _MS3KG_App_Arpi_Mode_MIN MS3KG_App_Arpi_Mode_ARP1
#define _MS3KG_App_Arpi_Mode_MAX MS3KG_App_Arpi_Mode_ARP8
#define _MS3KG_App_Arpi_Mode_ARRAYSIZE ((MS3KG_App_Arpi_Mode)(MS3KG_App_Arpi_Mode_ARP8+1))

/* Struct definitions */
typedef struct _MS3KG_App_Remote {
    char dummy_field;
/* @@protoc_insertion_point(struct:MS3KG_App_Remote) */
} MS3KG_App_Remote;

typedef struct _MS3KG_SysPref {
    char dummy_field;
/* @@protoc_insertion_point(struct:MS3KG_SysPref) */
} MS3KG_SysPref;

typedef struct _MS3KG_SysPref_AP_INFO {
    pb_callback_t networkName;
    pb_callback_t password;
/* @@protoc_insertion_point(struct:MS3KG_SysPref_AP_INFO) */
} MS3KG_SysPref_AP_INFO;

typedef struct _MIDI_INTERVALS {
    int32_t v;
/* @@protoc_insertion_point(struct:MIDI_INTERVALS) */
} MIDI_INTERVALS;

typedef struct _MIDI_OCTAVE {
    int32_t o;
/* @@protoc_insertion_point(struct:MIDI_OCTAVE) */
} MIDI_OCTAVE;

typedef struct _MS3KG_App_Arpi {
    bool has_mode;
    MS3KG_App_Arpi_Mode mode;
/* @@protoc_insertion_point(struct:MS3KG_App_Arpi) */
} MS3KG_App_Arpi;

typedef struct _MS3KG_App_Countdown {
    bool has_mode;
    MS3KG_App_Countdown_Mode mode;
/* @@protoc_insertion_point(struct:MS3KG_App_Countdown) */
} MS3KG_App_Countdown;

typedef struct _MS3KG_App_Magnet {
    bool has_mode;
    MS3KG_App_Magnet_Mode mode;
/* @@protoc_insertion_point(struct:MS3KG_App_Magnet) */
} MS3KG_App_Magnet;

typedef struct _MS3KG_App_Shake {
    bool has_image;
    char image[32];
    bool has_colorIndex;
    int32_t colorIndex;
    bool has_bounce;
    int32_t bounce;
/* @@protoc_insertion_point(struct:MS3KG_App_Shake) */
} MS3KG_App_Shake;

typedef struct _MS3KG_App_System {
    bool has_mode;
    MS3KG_App_System_Mode mode;
/* @@protoc_insertion_point(struct:MS3KG_App_System) */
} MS3KG_App_System;

typedef struct _MS3KG_App_Updater {
    bool has_shouldReset;
    int32_t shouldReset;
/* @@protoc_insertion_point(struct:MS3KG_App_Updater) */
} MS3KG_App_Updater;

typedef struct _RGB {
    int32_t R;
    int32_t G;
    int32_t B;
/* @@protoc_insertion_point(struct:RGB) */
} RGB;

typedef struct _MIDI_STEP {
    MIDI_INTERVALS interval;
    MIDI_OCTAVE octave;
    int32_t mode;
/* @@protoc_insertion_point(struct:MIDI_STEP) */
} MIDI_STEP;

typedef struct _MS3KG_App_Beat {
    bool has_mode;
    MS3KG_App_Beat_Mode mode;
    bool has_sensitivity;
    int32_t sensitivity;
    bool has_color;
    RGB color;
/* @@protoc_insertion_point(struct:MS3KG_App_Beat) */
} MS3KG_App_Beat;

typedef struct _MS3KG_App_Light {
    bool has_mode;
    MS3KG_App_Light_Mode mode;
    bool has_color;
    RGB color;
    bool has_colorIndex;
    int32_t colorIndex;
    bool has_triggerSpeed;
    int32_t triggerSpeed;
/* @@protoc_insertion_point(struct:MS3KG_App_Light) */
} MS3KG_App_Light;

typedef struct _MIDI_SEQUENCE {
    pb_size_t steps_count;
    MIDI_STEP steps[8];
/* @@protoc_insertion_point(struct:MIDI_SEQUENCE) */
} MIDI_SEQUENCE;

typedef struct _MS3KG_App_Sequi {
    bool has_sequence;
    MIDI_SEQUENCE sequence;
/* @@protoc_insertion_point(struct:MS3KG_App_Sequi) */
} MS3KG_App_Sequi;

typedef struct _MS3KG_App {
    bool has_current;
    MS3KG_App_T current;
    bool has_shake;
    MS3KG_App_Shake shake;
    bool has_light;
    MS3KG_App_Light light;
    bool has_magnet;
    MS3KG_App_Magnet magnet;
    bool has_system;
    MS3KG_App_System system;
    bool has_remote;
    MS3KG_App_Remote remote;
    bool has_beat;
    MS3KG_App_Beat beat;
    bool has_countdown;
    MS3KG_App_Countdown countdown;
    bool has_arpi;
    MS3KG_App_Arpi arpi;
    bool has_sequi;
    MS3KG_App_Sequi sequi;
    bool has_updater;
    MS3KG_App_Updater updater;
/* @@protoc_insertion_point(struct:MS3KG_App) */
} MS3KG_App;

typedef struct _MS3KG {
    bool has_apps;
    MS3KG_App apps;
/* @@protoc_insertion_point(struct:MS3KG) */
} MS3KG;

/* Default values for struct fields */
extern const int32_t RGB_R_default;
extern const int32_t RGB_G_default;
extern const int32_t RGB_B_default;
extern const int32_t MIDI_OCTAVE_o_default;
extern const int32_t MIDI_INTERVALS_v_default;
extern const MS3KG_App_Light_Mode MS3KG_App_Light_mode_default;
extern const MS3KG_App_Magnet_Mode MS3KG_App_Magnet_mode_default;
extern const MS3KG_App_System_Mode MS3KG_App_System_mode_default;
extern const MS3KG_App_Beat_Mode MS3KG_App_Beat_mode_default;
extern const int32_t MS3KG_App_Beat_sensitivity_default;
extern const MS3KG_App_Countdown_Mode MS3KG_App_Countdown_mode_default;
extern const MS3KG_App_Arpi_Mode MS3KG_App_Arpi_mode_default;

/* Initializer values for message structs */
#define RGB_init_default                         {255, 121, 0}
#define MIDI_OCTAVE_init_default                 {5}
#define MIDI_INTERVALS_init_default              {0}
#define MIDI_STEP_init_default                   {MIDI_INTERVALS_init_default, MIDI_OCTAVE_init_default, 0}
#define MIDI_SEQUENCE_init_default               {0, {MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default, MIDI_STEP_init_default}}
#define MS3KG_init_default                       {false, MS3KG_App_init_default}
#define MS3KG_SysPref_init_default               {0}
#define MS3KG_SysPref_AP_INFO_init_default       {{{NULL}, NULL}, {{NULL}, NULL}}
#define MS3KG_App_init_default                   {false, _MS3KG_App_T_MIN, false, MS3KG_App_Shake_init_default, false, MS3KG_App_Light_init_default, false, MS3KG_App_Magnet_init_default, false, MS3KG_App_System_init_default, false, MS3KG_App_Remote_init_default, false, MS3KG_App_Beat_init_default, false, MS3KG_App_Countdown_init_default, false, MS3KG_App_Arpi_init_default, false, MS3KG_App_Sequi_init_default, false, MS3KG_App_Updater_init_default}
#define MS3KG_App_Shake_init_default             {false, "", false, 0, false, 0}
#define MS3KG_App_Light_init_default             {false, MS3KG_App_Light_Mode_RAINBOW, false, RGB_init_default, false, 0, false, 0}
#define MS3KG_App_Magnet_init_default            {false, MS3KG_App_Magnet_Mode_BARS}
#define MS3KG_App_System_init_default            {false, MS3KG_App_System_Mode_VERSION}
#define MS3KG_App_Remote_init_default            {0}
#define MS3KG_App_Beat_init_default              {false, MS3KG_App_Beat_Mode_SIDE, false, 2, false, RGB_init_default}
#define MS3KG_App_Countdown_init_default         {false, MS3KG_App_Countdown_Mode_DOWN_1M}
#define MS3KG_App_Arpi_init_default              {false, MS3KG_App_Arpi_Mode_ARP8}
#define MS3KG_App_Sequi_init_default             {false, MIDI_SEQUENCE_init_default}
#define MS3KG_App_Updater_init_default           {false, 0}
#define RGB_init_zero                            {0, 0, 0}
#define MIDI_OCTAVE_init_zero                    {0}
#define MIDI_INTERVALS_init_zero                 {0}
#define MIDI_STEP_init_zero                      {MIDI_INTERVALS_init_zero, MIDI_OCTAVE_init_zero, 0}
#define MIDI_SEQUENCE_init_zero                  {0, {MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero, MIDI_STEP_init_zero}}
#define MS3KG_init_zero                          {false, MS3KG_App_init_zero}
#define MS3KG_SysPref_init_zero                  {0}
#define MS3KG_SysPref_AP_INFO_init_zero          {{{NULL}, NULL}, {{NULL}, NULL}}
#define MS3KG_App_init_zero                      {false, _MS3KG_App_T_MIN, false, MS3KG_App_Shake_init_zero, false, MS3KG_App_Light_init_zero, false, MS3KG_App_Magnet_init_zero, false, MS3KG_App_System_init_zero, false, MS3KG_App_Remote_init_zero, false, MS3KG_App_Beat_init_zero, false, MS3KG_App_Countdown_init_zero, false, MS3KG_App_Arpi_init_zero, false, MS3KG_App_Sequi_init_zero, false, MS3KG_App_Updater_init_zero}
#define MS3KG_App_Shake_init_zero                {false, "", false, 0, false, 0}
#define MS3KG_App_Light_init_zero                {false, _MS3KG_App_Light_Mode_MIN, false, RGB_init_zero, false, 0, false, 0}
#define MS3KG_App_Magnet_init_zero               {false, _MS3KG_App_Magnet_Mode_MIN}
#define MS3KG_App_System_init_zero               {false, _MS3KG_App_System_Mode_MIN}
#define MS3KG_App_Remote_init_zero               {0}
#define MS3KG_App_Beat_init_zero                 {false, _MS3KG_App_Beat_Mode_MIN, false, 0, false, RGB_init_zero}
#define MS3KG_App_Countdown_init_zero            {false, _MS3KG_App_Countdown_Mode_MIN}
#define MS3KG_App_Arpi_init_zero                 {false, _MS3KG_App_Arpi_Mode_MIN}
#define MS3KG_App_Sequi_init_zero                {false, MIDI_SEQUENCE_init_zero}
#define MS3KG_App_Updater_init_zero              {false, 0}

/* Field tags (for use in manual encoding/decoding) */
#define MS3KG_SysPref_AP_INFO_networkName_tag    1
#define MS3KG_SysPref_AP_INFO_password_tag       2
#define MIDI_INTERVALS_v_tag                     1
#define MIDI_OCTAVE_o_tag                        1
#define MS3KG_App_Arpi_mode_tag                  1
#define MS3KG_App_Countdown_mode_tag             1
#define MS3KG_App_Magnet_mode_tag                1
#define MS3KG_App_Shake_image_tag                1
#define MS3KG_App_Shake_colorIndex_tag           2
#define MS3KG_App_Shake_bounce_tag               3
#define MS3KG_App_System_mode_tag                1
#define MS3KG_App_Updater_shouldReset_tag        1
#define RGB_R_tag                                1
#define RGB_G_tag                                2
#define RGB_B_tag                                3
#define MIDI_STEP_interval_tag                   1
#define MIDI_STEP_octave_tag                     2
#define MIDI_STEP_mode_tag                       3
#define MS3KG_App_Beat_mode_tag                  1
#define MS3KG_App_Beat_sensitivity_tag           2
#define MS3KG_App_Beat_color_tag                 3
#define MS3KG_App_Light_mode_tag                 1
#define MS3KG_App_Light_color_tag                2
#define MS3KG_App_Light_colorIndex_tag           3
#define MS3KG_App_Light_triggerSpeed_tag         4
#define MIDI_SEQUENCE_steps_tag                  1
#define MS3KG_App_Sequi_sequence_tag             1
#define MS3KG_App_current_tag                    1
#define MS3KG_App_shake_tag                      2
#define MS3KG_App_light_tag                      3
#define MS3KG_App_magnet_tag                     4
#define MS3KG_App_system_tag                     5
#define MS3KG_App_remote_tag                     6
#define MS3KG_App_beat_tag                       7
#define MS3KG_App_countdown_tag                  8
#define MS3KG_App_arpi_tag                       9
#define MS3KG_App_sequi_tag                      10
#define MS3KG_App_updater_tag                    11
#define MS3KG_apps_tag                           1

/* Struct field encoding specification for nanopb */
extern const pb_field_t RGB_fields[4];
extern const pb_field_t MIDI_OCTAVE_fields[2];
extern const pb_field_t MIDI_INTERVALS_fields[2];
extern const pb_field_t MIDI_STEP_fields[4];
extern const pb_field_t MIDI_SEQUENCE_fields[2];
extern const pb_field_t MS3KG_fields[2];
extern const pb_field_t MS3KG_SysPref_fields[1];
extern const pb_field_t MS3KG_SysPref_AP_INFO_fields[3];
extern const pb_field_t MS3KG_App_fields[12];
extern const pb_field_t MS3KG_App_Shake_fields[4];
extern const pb_field_t MS3KG_App_Light_fields[5];
extern const pb_field_t MS3KG_App_Magnet_fields[2];
extern const pb_field_t MS3KG_App_System_fields[2];
extern const pb_field_t MS3KG_App_Remote_fields[1];
extern const pb_field_t MS3KG_App_Beat_fields[4];
extern const pb_field_t MS3KG_App_Countdown_fields[2];
extern const pb_field_t MS3KG_App_Arpi_fields[2];
extern const pb_field_t MS3KG_App_Sequi_fields[2];
extern const pb_field_t MS3KG_App_Updater_fields[2];

/* Maximum encoded size of messages (where known) */
#define RGB_size                                 33
#define MIDI_OCTAVE_size                         11
#define MIDI_INTERVALS_size                      11
#define MIDI_STEP_size                           37
#define MIDI_SEQUENCE_size                       312
#define MS3KG_size                               523
#define MS3KG_SysPref_size                       0
/* MS3KG_SysPref_AP_INFO_size depends on runtime parameters */
#define MS3KG_App_size                           520
#define MS3KG_App_Shake_size                     56
#define MS3KG_App_Light_size                     59
#define MS3KG_App_Magnet_size                    2
#define MS3KG_App_System_size                    2
#define MS3KG_App_Remote_size                    0
#define MS3KG_App_Beat_size                      48
#define MS3KG_App_Countdown_size                 2
#define MS3KG_App_Arpi_size                      2
#define MS3KG_App_Sequi_size                     315
#define MS3KG_App_Updater_size                   11

/* Message IDs (where set with "msgid" option) */
#ifdef PB_MSGID

#define MS3000_MESSAGES \


#endif

#ifdef __cplusplus
} /* extern "C" */
#endif
/* @@protoc_insertion_point(eof) */

#endif

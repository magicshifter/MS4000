# Install script for directory: /home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Install shared libraries without execute permission?
if(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  set(CMAKE_INSTALL_SO_NO_EXE "1")
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

# Set default install directory permissions.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "/usr/bin/objdump")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/local/lib/python3.10/dist-packages/proto" TYPE FILE FILES
    "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/build/nanopb_pb2.py"
    "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/generator/proto/nanopb.proto"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/local/lib/python3.10/dist-packages/proto" TYPE FILE FILES "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/generator/proto/_utils.py")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/bin" TYPE PROGRAM FILES
    "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/generator/nanopb_generator.py"
    "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/generator/protoc-gen-nanopb"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE STATIC_LIBRARY FILES "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/build/libprotobuf-nanopb.a")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/nanopb/nanopb-targets.cmake")
    file(DIFFERENT EXPORT_FILE_CHANGED FILES
         "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/nanopb/nanopb-targets.cmake"
         "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/build/CMakeFiles/Export/lib/cmake/nanopb/nanopb-targets.cmake")
    if(EXPORT_FILE_CHANGED)
      file(GLOB OLD_CONFIG_FILES "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/nanopb/nanopb-targets-*.cmake")
      if(OLD_CONFIG_FILES)
        message(STATUS "Old export file \"$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/nanopb/nanopb-targets.cmake\" will be replaced.  Removing files [${OLD_CONFIG_FILES}].")
        file(REMOVE ${OLD_CONFIG_FILES})
      endif()
    endif()
  endif()
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake/nanopb" TYPE FILE FILES "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/build/CMakeFiles/Export/lib/cmake/nanopb/nanopb-targets.cmake")
  if("${CMAKE_INSTALL_CONFIG_NAME}" MATCHES "^()$")
    file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake/nanopb" TYPE FILE FILES "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/build/CMakeFiles/Export/lib/cmake/nanopb/nanopb-targets-noconfig.cmake")
  endif()
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake/nanopb" TYPE FILE FILES
    "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/extra/nanopb-config.cmake"
    "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/build/nanopb-config-version.cmake"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include" TYPE FILE FILES
    "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/pb.h"
    "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/pb_common.h"
    "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/pb_encode.h"
    "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/pb_decode.h"
    )
endif()

if(CMAKE_INSTALL_COMPONENT)
  set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INSTALL_COMPONENT}.txt")
else()
  set(CMAKE_INSTALL_MANIFEST "install_manifest.txt")
endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
file(WRITE "/home/ibi/Documents/Development/MagicShifter/MS3000/MS3000-Firmware/Tools/nanopb/build/${CMAKE_INSTALL_MANIFEST}"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")

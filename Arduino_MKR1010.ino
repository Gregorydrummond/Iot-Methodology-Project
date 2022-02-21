/*************************************************************
  Download latest Blynk library here:
    https://github.com/blynkkk/blynk-library/releases/latest

  Blynk is a platform with iOS and Android apps to control
  Arduino, Raspberry Pi and the likes over the Internet.
  You can easily build graphic interfaces for all your
  projects by simply dragging and dropping widgets.

    Downloads, docs, tutorials: http://www.blynk.cc
    Sketch generator:           http://examples.blynk.cc
    Blynk community:            http://community.blynk.cc
    Follow us:                  http://www.fb.com/blynkapp
                                http://twitter.com/blynk_app

  Blynk library is licensed under MIT license
  This example code is in public domain.

 *************************************************************
  This example shows how to use Arduino MKR 1010
  to connect your project to Blynk.

  Note: This requires WiFiNINA library
    from http://librarymanager/all#WiFiNINA

  Feel free to apply it to any other example. It's simple!
 *************************************************************/

/* Comment this out to disable prints and save space */
#define BLYNK_PRINT Serial

/* Fill-in your Template ID (only if using Blynk.Cloud) */
#define BLYNK_TEMPLATE_ID "TMPLrXQK-uZQ"
//#define BLYNK_DEVICE_NAME "Quickstart Template"
#define BLYNK_AUTH_TOKEN "-gBY6blwH_I2tJzJ76skJ-_OCcmmtBIe"

#include <SPI.h>
#include <WiFiNINA.h>
#include <BlynkSimpleWiFiNINA.h>

// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = BLYNK_AUTH_TOKEN;

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "IoT_Hotspot";
char pass[] = "12345678";

//BlynkTimer Object
BlynkTimer timer;

//Data
int pulseSensorData;

//Pins
int pulseSensorDataPin = A0;
int LED_PIN = 0;

//Reads pulse data and sends it to Blynk Cloud. Should get called periodically
void getPulseSensorData() {
  //Read pulse sensor data from an analog pin
  pulseSensorData = analogRead(pulseSensorDataPin);

  //Write data to virtual pin 5 (Pin arbitrarily picked) 
  Blynk.virtualWrite(V5, pulseSensorData);
}

//This function is called every time the Virtual Pin 0 state changes
//Write value sent to pin 0
BLYNK_WRITE(V0) {
  int pinValue = param.asInt();
  digitalWrite(LED_PIN, pinValue);
}

void setup()
{
  // Debug console
  Serial.begin(9600);

  Blynk.begin(auth, ssid, pass);
  //Blynk.begin(auth, ssid, pass, "http://iot.nortcele.win", 8080);
  // You can also specify server:
  //Blynk.begin(auth, ssid, pass, "blynk-cloud.com", 80);
  //Blynk.begin(auth, ssid, pass, IPAddress(10,138,88,60), 8080);

  //Configure pin directions
  //pinMode(pulseSensorDataPin, OUTPUT);
  pinMode(LED_PIN, OUTPUT);

  //Configure timer to call getPulseSensorData() every 0.2 seconds
  timer.setInterval(200L, getPulseSensorData);
}

void loop()
{
  Blynk.run();
  timer.run();
}

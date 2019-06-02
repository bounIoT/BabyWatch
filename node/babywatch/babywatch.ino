#include <Bridge.h>
#include <HttpClient.h>
#include "include/constants.h"

int motionCount = 0;
int soundCount = 0;
unsigned long startTime;

void setup() {
  pinMode(SOUND_PIN, INPUT);
  pinMode(POWER_PIN, INPUT);
  pinMode(MOTION_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);

  // Bridge takes about two seconds to start up
  // it can be helpful to use the on-board LED
  // as an indicator for when it has initialized
  pinMode(13, OUTPUT);
  digitalWrite(13, LOW);
  Bridge.begin();
  digitalWrite(13, HIGH);

  // Initialize the timer.
  startTime = millis();
}

void loop() {
  if (isRunning()) {
    if (isTimeout()) {
      sendData();
      reset();
    }
    // Read values from the sensors.
    soundCount += digitalRead(SOUND_PIN);
    motionCount += digitalRead(MOTION_PIN);
  }
  delay(500);
}

// Reset the timer and clear the info collected from the sensors.
void reset() {
  soundCount = 0;
  motionCount = 0;
  startTime = millis();
}

// Returns whether the program has reached the time limit.
bool isTimeout() {
  unsigned long currentTime = millis();
  return currentTime - startTime >=  TIME_LIMIT;
}

// Returns whether the application is running.
bool isRunning() {
  return digitalRead(POWER_PIN) == HIGH;
}

// Sends the data to the cloud server over HTTP via POST request.
void sendData() {
  HttpClient client;
  char data[256];
  snprintf(data, sizeof(data), "deviceId=%s&secretKey=%s&soundCount=%d&motionCount=%d", DEVICE_ID, SECRET_KEY, soundCount, motionCount);
  client.noCheckSSL();
  int res = client.post(HTTP_URL, data);
  
  // If the request fails, wait for a specific amount of time and try again.
  // Use the LED as an indicator of failure by lighting the LED after a failure
  // and turning it off just before the next trial.
  while (res != 0) {
    digitalWrite(LED_PIN, HIGH);
    delay(5000);
    digitalWrite(LED_PIN, LOW);
    res = client.get(HTTP_URL);
  }
}

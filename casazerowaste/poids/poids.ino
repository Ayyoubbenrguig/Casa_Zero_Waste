#include <HX711.h>

const int LOADCELL_DOUT_PIN = 2;    // Broche DOUT du capteur HX711
const int LOADCELL_SCK_PIN = 19;     // Broche SCK du capteur HX711

HX711 scale;

void setup() {
  Serial.begin(9600);
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale();
  scale.tare();
}

void loop() {
  float weight = scale.get_units();
  Serial.print("Poids : ");
  Serial.print(weight);
  Serial.println(" kg");
  delay(1000);
}

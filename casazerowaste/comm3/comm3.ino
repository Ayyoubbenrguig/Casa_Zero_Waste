#include <ESP32Servo.h>
#include <Ultrasonic.h>

const int pinTrigger1 = 5;
const int pinEcho1 = 18;
const int pinTrigger2 = 32;
const int pinEcho2 = 33;
const int pinServo1 = 23;
const int pinServo2 = 22;

Servo servo1;
Servo servo2;
Ultrasonic capteurUltrason1(pinTrigger1, pinEcho1);
Ultrasonic capteurUltrason2(pinTrigger2, pinEcho2);

const int distanceDetection = 20;
const int delaiFermeture = 5000;
const int HAUTEUR_POUBELLE = 50;
const int CAPACITE_POUBELLE = 100;

void setup() {
  Serial.begin(115200);
  servo1.attach(pinServo1);
  servo2.attach(pinServo2);
}

void loop() {
  int distance1 = capteurUltrason1.read();
  int distance2 = capteurUltrason2.read();

  while (distance1 <= distanceDetection) {
    ouvrirPorte();
    distance1 = capteurUltrason1.read();
    delay(1000);
  }

  fermerPorte();

  if (distance2 > 2) {
    int tauxRemplissage = 100-map(distance2, 0, HAUTEUR_POUBELLE, 0, 100);
    
    if (tauxRemplissage >= 94) {
      tauxRemplissage = 100;
      Serial.println("poubelle est pleine");
    }
    if (tauxRemplissage < 0) {
      tauxRemplissage = 0;
    }

    Serial.print("Distance 1 : ");
    Serial.print(distance1);
    Serial.print(" cm\t");
    Serial.print("Distance 2 : ");
    Serial.print(distance2);
    Serial.println(" cm");
    Serial.print("Taux de remplissage de la poubelle : ");
    Serial.print(tauxRemplissage);
    Serial.println("%");
  }
  
  delay(1000);
}

void ouvrirPorte() {
  servo1.write(0);
  servo2.write(0);
}

void fermerPorte() {
  servo1.write(70);
  servo2.write(70);
}

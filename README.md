# BabyWatch

BabyWatch is a parental control device for working parents who are concerned with sleeping habits of their babies.

![Splash](assets/splash.jpeg)

## IoT Architecture

![IoT Architecture](assets/iot_architecture.jpg)

## Components

| Component             | Name                                        | Action                                                         |
|-----------------------|---------------------------------------------|----------------------------------------------------------------|
| Sound Sensor          | KY-038                                      | Integration                                                    |
| PIR Motion Sensor     | HC-SR501                                    | Integration                                                    |
| Wireless Connectivity | WIFI                                        | Integration(on Arduino Yùn)                                    |
| Embedded HW Platform  | Arduino Yùn                                 | Integration                                                    |
| Embedded HW App       | Arduino Ide                                 | Development                                                    |
| Cloud Platform        | Digital Ocean                               | Integration                                                    |
| Cloud App SW          | Node.JS                                     | Development(We implemented backend side of Cloud with Node.JS) |
| Web Client SW         | Material Dashboard with Javascript and HTML | Development(We used Material Dashboard and Bootstrap Library)s |

## Circuit Diagram

![BabyWatch Circuit Diagram](assets/BabyWatch_circuit.png)
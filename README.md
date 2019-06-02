# BabyWatch

BabyWatch is a parental control device for working parents who are concerned with sleeping habits of their babies.

![Splash](https://user-images.githubusercontent.com/25671417/58762252-fffd9000-8556-11e9-91e2-f0560f77b7f1.jpeg)

## IoT Architecture

![IoT Architecture](https://user-images.githubusercontent.com/25671417/58762250-ff64f980-8556-11e9-9f03-d4280f46abc6.jpg)

## Solution

![Solution](https://user-images.githubusercontent.com/25671417/58762251-ff64f980-8556-11e9-89fd-54a8566a3908.png)

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

![BabyWatch Circuit](https://user-images.githubusercontent.com/25671417/58762249-ff64f980-8556-11e9-9a0a-a9a07e546dee.png)

## Credits

### Front End
* [Material Dashboard](https://github.com/creativetimofficial/material-dashboard) by [Creative Tim](https://github.com/creativetimofficial/)

### Back End
* [MongoDB](https://github.com/mongodb/mongo)
* [Mongoose](https://github.com/Automattic/mongoose)
* [Express.JS](https://github.com/expressjs/express)
* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
* [Body Parser](https://github.com/expressjs/body-parser)
* [Cookie Parser](https://github.com/expressjs/cookie-parser)
* [Connect Mongo](https://github.com/jdesboeufs/connect-mongo)
* [EJS](https://github.com/tj/ejs)
* [Express Session](https://github.com/expressjs/session)
* [Helmet](https://github.com/helmetjs/helmet)
* [URL](https://github.com/defunctzombie/node-url)

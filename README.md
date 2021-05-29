# This repository shows how you can build API for iCommerce with microservice architecture using nestjs

## Features of iCommerce
This example is basically an API for some online web application. It provides a possibility to perform search, filter, view product, activity product, order product.
## ERD 

![Alt text](https://res.cloudinary.com/dged6vxpd/image/upload/v1622250097/Screenshot_2021-05-29_at_08.00.57_hob2ad.png "Optional Title")
## Sequence diagram 
![Alt text](https://res.cloudinary.com/dged6vxpd/image/upload/v1622219862/Screenshot_2021-05-28_at_23.37.30_icb8yq.png "Sequence diagram")
## API Layer
NestJS + Express acts as the API Layer for the architecture. It takes care of listening for client requests and calling the appropriate back-end microservice to fulfill them.

## Microservice Layer
TCP was chosen as the framework to do the microservices. 

## Persistence Layer
MongoDB is used as the database and mongose is used as the Object-Relational Mapper (ORM).

## Running the example with docker-compose
Execute `docker network create infrastructure && cp .env.example .env && docker-compose up -d` from the root of the repository
## Accessing the API itself and swagger docs for the API
- Once you launch the API it will be accessible on port 8000.
- Swagger docs for the API will be accessible locally via URI "**http://localhost:8000/api**"
## Launch services for integration testing (using docker-compose)
- Execute `cp .env.example .env && cp .env.test.example .env.test`
- Execute `docker-compose -f ./docker-compose.test.yml up -d` from the root of the repository
- Run `cd ./gateway && npm install && npm run test` from the root of this repo
scripts - This directory consists of shell scripts that automates building and running the whole project.
## Brief architecture overview
This API showcase consists of the following parts:
- API gateway
- Activity service - responsible for create activity support sales and marketing
- Product service - responsible for CRUD operations on products and search, filter, view products
- Order service - responsible for create order of customer
- The service interact via **TCP sockets**

This example uses a SINGLE database (MongoDB) instance for all microservices. **This is not a correct point, the correct way is to use a separate DB instance for every microservice.** I used one DB instance for all microservices to simplify this example.

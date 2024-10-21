# Node.js CRUD API

A simple CRUD API built with Node.js and TypeScript.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)


## Features

- Create, Read, Update, and Delete users
- User data stored in memory
- Simple RESTful API

## Technologies Used

- Node.js
- TypeScript
- dotenv (for environment variables)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) version 22.9.0 or higher
- npm (Node package manager)

### Installation

1. Clone the repository and switch to develop branch:

   ```bash
   git clone https://github.com/hasanovanar/nodejs-crud-api.git
   cd nodejs-crud-api
   ```

2. `npm install`

### Configuration

Create a **.env** file in the root of your project and specify the desired port:<br>
`PORT=3000`

### Running the Application

To run the application in development mode, use:<br>
`npm run start:dev`

To build and run the application in production mode, use:

`npm run start:prod`

### API Endpoints

- **GET /api/users**
  Retrieve all users
  Response: User records in form of array.

- **GET /api/users/{userId}**

Retrieve a user by ID.
Response: User object, 400 if userId is invalid (not uuid) or 404 if not found.

- **POST /api/users**

Create a new user.
Request Body: { "username": "string", "age": number, "hobbies": ["string"] }
Response: Newly created user object.

- **PUT /api/users/{userId}**

Update an existing user. <br>
Request Body: { "username": "string", "age": number, "hobbies": ["string"] } <br>
**Note: any field may be missed in request body, old values will be preserved** <br>
Response: Updated user object, 400 if userId is invalid (not uuid) or 404 if not found.

- **DELETE /api/users/{userId}**

Delete a user by ID.<br>
Response: Confirmation message 400 if userId is invalid (not uuid) or 404 if not found.


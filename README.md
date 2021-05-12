# Web Chat Application
The goal of this project was to create a web chat that allows users to talk in a chatroom and a bot that answer to a stock command and post a message about a stock quote.

The project is totally focused on the backend, so the frontend is as simple as possible.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Tests](#tests)
- [Lint](#lint)
- [To do](#to-do)

## Features
Some features of the project are:
- User signup, login and logout;
- More than one chatroom;
- The chat messages are ordered by timestamps and the chat will show only the last 50 messages;
- It is possible to request a stock quote:
    - Post the command `/stock=stock_code` (Example: `/stock=aapl.us`) into de chatroom;
    - The bot will answer the command;
    - If the command does not follow this format it will be considered as a simple message;
    - The bot was developed to handle messages that are no understood

## Technologies
The following technologies were used for the development of the project:
- `Node.js`:
    - `web-chat` was developed with Typescript;
    - `bot` was developed with Javascript;
- `Redis 6` as a message broker.
- `Socket.io` to create the websocket.
- `Express` to create the server.
- `Jest`, a test library.
- `Knex` as SQL query builder.
- `MySQL` as database.

## Installation
First, clone or download the project. After that you will need `Docker` and `docker-compose`. For this project I used `Docker (19.03.6)` and `docker-compose (1.26.2)`

### Environment File
To run the services it is necessary to create the .env files before.

### Web Chat
It is necessary to copy the `.env.example` file in the `web-chat` folder to a file named `.env` at the same directory.

### Bot
It is necessary to copy the `.env.example` file in the `bot` folder to a file named `.env` at the same directory.

## Running

To run the project go to the directory where `docker-compose.yml` file is and run the following commands:

### Web Chat
```
docker-compose up web-chat
```
You will see in the log `Web chat initialized` and it will be running at `http://localhost:3000`

### Bot
After Web Chat running, you can run the bot:

```
docker-compose up bot
```
You will see in the log `Bot initialized`. It will be running and connected with the web chat.

## Tests

### Unit Tests
To run the unit tests go to the directory where `docker-compose.yml` file is and run the following commands:

#### Web Chat
```
docker-compose run --rm web-chat npm run test:unit
```

#### Bot
```
docker-compose run --rm bot npm run test:unit
```
To run without the docker you will need `Node.js` (version used `14.16.1`) installed. Go to directory (`web-chat` or `bot`), run `npm install` and after that `npm run test:unit`.

## Lint
To run the lint

#### Web Chat
```
docker-compose run --rm web-chat npm run lint
```

#### Bot
```
docker-compose run --rm bot npm run lint
```

To run without the docker you will need `Node.js` (version used `14.16.1`) installed. Go to directory (`web-chat` or `bot`), run `npm install` and after that `npm run lint`.

## To do
- Improve error handling;
- Improve the design of the frontend;
- Write more unit tests and improve existing ones;
- Write integration tests;
- Allow the user to create their own rooms;
- Add application monitoring;
- Add GitHub Actions to build and test;
- Include session control to allow one user per session

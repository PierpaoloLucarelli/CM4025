# CM4025 Enterprise web systems coursework

This is a README intended to provide an overview of the project requirements for the MMORPG game.


## Overview of the game

This section describes the main features and functionality of the game.

### Theme

The chosen them was **Sports** / **racing**. The implemented game consists of a demolition-derby style multi-level game, where players can join an arena and compete against each other. 

### Progression

Progression is determined by the points accumulated by the player over time. Points are obtained by crashing head-on to another player's car. The player that wins the collision will receive points and the player that looses the collision will not receive any points. 

Points can be used in this game in two ways:

- To **upgrade** the player's car: The players can enter a marketplace where it is possible to purchase and upgrade the player's car using the points accumulated during gameplay. Each car has a price to be paid in points. When a player buys a car the cost of the car is deducted form the points of the player. 
- To **upgrade** to another level: Once the player has reached a total of 60pts, the player can chose to unlock another level. Different levels have different arenas where the players can compete. 

### Social interaction

PIC OF CARS
As the game is a real-time multiplayer game, the players can directly with each other simply by playing the game. There is no limit to the numbers of concurrent players that can join, but the performance of the server may be affected by too may concurrent connections. 

PIC OF CHAT
To add another level of social interaction, a chat was implemented were the players can broadcast their messages to every other player in the game. 

## Technology used

### front-end 

The game part of the project was implemented using the JavaScript Game framework **Phaser.js**. The code for driving a car in Phaser.js was taken from an online tutorial, but it was extended to the multi-player case. In addition the collision detection system was created by me along with all the front-end functionality such as **points**, **cars** and **levels** management. 

How the collision detection systems works

The collision detection systems was implemented by checking wether the front-point of a car was in contact with any point of the other cars. 
The front-point of the car can be calculated using the formula:

```
x = carX + (Cos(θ) + LengthOfCar / 2)
y = cary + (Sin(θ) + LengthOfCar / 2)
```

Example of how the X point of the tip of the car is calculated:

IMG CAR

The functionality of the pages like **market** and **levels** were implemented using JQuery, as there was only a need of simple AJAX calls to the server. 

The project was developed using **webpack** and the modular JavaScript ES6 syntax 

### Backend 

The server of the game uses the following technologies:

- Nodejs + Express: these technologies were used to implement a simple HTTP server that is able to respond to client requests and API calls. 
- Socket.io: Used to implement the real-time client-to-client communication for the driving of the cars.
- MongoDB and Mongoose ORM: used for storing information such as: User accounts, car details, levels and points.

### API specification

| End point |  Description | Method | Response|
|------------|--------|------------|-------------|
|/|  Returns main page         |GET            | HTML
|/ | Logs a user in     | POST          |JSON            |
|/register | Registers a user          |POST| JSON |
|/game | Sends the main game          |GET| HTML |
|/levels | Sends the level page          |GET| HTML |
|/user/:userID | Gets details of a user          |GET| JSON |
|/set_level |  Unlocks a level for the logged in user   |GET| JSON |
|/market | Sends the market page          |GET| HTML|
|/market | Buys a car          |POST| JSON |
 

## Future work and improvements

- Make the cars more customisable by adding car parts like: Engine, Wheels, etc. to the market. 
- I wasn't able to separate the levels by players, meaning that players on level 1 can still see the players in level2. To separate the players by level I would have to implement Socket.io rooms and keep a reference for each user that shows which socket room it belongs in.
- Add more levels to add further progress. 
- The workings of the collision detection when two cars collide head-to-head is a bit unstable, producing random results in deciding which player wins and which loses the collision. One solution might be to penalise both players. 
# Video Game Score API

This is a simple REST API for tracking video game scores.  
It stores data in SQLite and supports creating, reading, updating, deleting, and filtering scores through Express routes.

## Features

- Create a new score
- Read all scores
- Read one score by ID
- Update a score
- Delete a score
- Filter scores by category with query parameters
- Uses SQLite for persistent storage
- Tested with Postman

## Tech Stack

- Node.js
- Express
- SQLite
- Postman

## Installation

1. Clone the repository:
   ```bash
   git clone <your-github-repo-url>
   cd video-game-score-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server runs on:
```bash
http://localhost:3000
```

## API Routes

### Get all scores
`GET /api/scores`

### Get one score by ID
`GET /api/scores/:id`

### Get scores by category
`GET /api/scores?category=arcade`

### Create a new score
`POST /api/scores`

Example body:
```json
{
  "playerName": "Alex",
  "gameTitle": "Elden Ring",
  "score": 9800,
  "category": "RPG",
  "platform": "PC"
}
```

### Update a score
`PUT /api/scores/:id`

Example body:
```json
{
  "playerName": "Alex",
  "gameTitle": "Elden Ring",
  "score": 12000,
  "category": "RPG",
  "platform": "PC"
}
```

### Delete a score
`DELETE /api/scores/:id`

## Status Codes

- `200 OK` - Successful GET, PUT, or DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Missing or invalid data
- `404 Not Found` - Score with given ID does not exist

## Postman Testing

This project includes saved Postman requests for all CRUD routes.  
Export the collection as JSON and submit it together with the GitHub repository.

## Project Description

This API is a simple backend for storing video game scores. It lets you save a player's name, the game title, score, category, and platform in a SQLite database. The project was built to practice REST API fundamentals with Express, SQLite, and Postman.
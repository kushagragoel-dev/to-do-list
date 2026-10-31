# MERN Todo App

A simple todo app built with MongoDB, Express, React and Node.

## Features
- Add a todo
- Mark a todo as done
- Delete a todo

## Setup

You need Node.js and a MongoDB database (local or MongoDB Atlas).

### 1. Server
```
cd server
npm install
cp .env.example .env     # then put your MongoDB url in .env
npm start
```
Server runs on http://localhost:5000

### 2. Client
```
cd client
npm install
npm run dev
```
Client runs on http://localhost:5173

## API

| Method | Route            | What it does      |
|--------|------------------|-------------------|
| GET    | /api/todos       | get all todos     |
| POST   | /api/todos       | add a todo        |
| PUT    | /api/todos/:id   | toggle done       |
| DELETE | /api/todos/:id   | delete a todo     |

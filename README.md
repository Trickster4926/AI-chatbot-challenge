# Ollama Web Chat (Next.js + Express + MongoDB)

A simple web-based chat application where users can chat with a local AI
model powered by **Ollama**.

-   Frontend: Next.js (JavaScript)
-   Backend: Node.js + Express
-   Database: MongoDB
-   LLM Backend: Ollama (HTTP API)

------------------------------------------------------------------------

## Features

-   Single chat session (no authentication)
-   Persistent chat history (MongoDB)
-   Graceful error handling when Ollama is unavailable
-   Max user input length: **500 characters**

------------------------------------------------------------------------
## Clone/Pull Project

- Clone or Pull project from [AI-chatbot-challenge Github](https://github.com/Trickster4926/AI-chatbot-challenge.git)

------------------------------------------------------------------------
## Project Structure

    ollama-chat/
    ├── backend/
    │   ├── models/
    │   │   └── Message.js
    │   ├── server.js
    │   ├── package.json
    │   └── .env
    │
    ├── frontend/
    │   ├── pages/
    │   │   └── index.js
    │   ├── styles/
    │   ├── package.json
    │   └── next.config.js
    │
    └── README.md

------------------------------------------------------------------------

## Prerequisites

-   Node.js (v18+ recommended)
-   MongoDB (local or Atlas)
-   Ollama


------------------------------------------------------------------------

## Environment Variables

### Backend (`backend/.env`)

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/ollama-chat
    OLLAMA_URL=http://localhost:11434
    OLLAMA_MODEL=llama3

------------------------------------------------------------------------
## Running Ollama

Install from https://ollama.com

    ollama pull llama3
------------------------------------------------------------------------

## Backend Setup (Don't forget to add .env file)

    cd backend
    npm install
    node server.js

------------------------------------------------------------------------

## Frontend Setup

    cd frontend
    npm install
    npm run dev

then chat bot will available at localhost:3000

------------------------------------------------------------------------



## Constraints

-   No authentication
-   Single chat session
-   Max input length: 500 characters


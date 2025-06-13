# 🚀 Real-Time Chat Application

A modern, full-stack real-time chat application built with **NestJS**, **GraphQL**, and **React**. Experience seamless real-time messaging with a beautiful, responsive interface and robust backend architecture.

## ✨ Features

### 🎯 Core Functionality

- **Real-time messaging** - Instant message delivery using GraphQL subscriptions
- **User authentication** - Secure JWT-based authentication system
- **Chat rooms** - Create and join multiple chat rooms
- **Online status** - See who's online in real-time
- **Message history** - Persistent message storage and retrieval
- **Typing indicators** - See when other users are typing
- **User profiles** - Customizable user profiles with avatars

### 🛠️ Technical Features

- **GraphQL API** - Efficient, type-safe API with subscriptions for real-time updates
- **WebSocket connections** - Persistent connections for instant communication
- **Type safety** - Full TypeScript implementation across the stack
- **Database integration** - Persistent data storage with proper relationships

## 🏗️ Tech Stack

### Backend

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework for building scalable applications
- **[GraphQL](https://graphql.org/)** - Query language and runtime for APIs
- **[Apollo Server](https://www.apollographql.com/docs/apollo-server/)** - GraphQL server implementation
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript superset
- **[Prisma](https://www.prisma.io/)** - Database ORM for type-safe database queries
- **[JWT](https://jwt.io/)** - JSON Web Tokens for authentication
- **[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)** - Real-time communication protocol

### Frontend

- **[React](https://reactjs.org/)** - Modern JavaScript library for building user interfaces
- **[Apollo Client](https://www.apollographql.com/docs/react/)** - Comprehensive GraphQL client
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Mantine](https://mantine.dev/)** - Component styling
- **[React Router](https://reactrouter.com/)** - Client-side routing

### Database

- **[PostgreSQL](https://www.postgresql.org/)** - Database for persistent storage
- **[Redis](https://redis.io/)** - In-memory data store for caching and sessions

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** or **MongoDB** database
- **Redis** (optional, for enhanced performance)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nadiia-dev/nest-graphql-react-chat-app.git
   cd nest-graphql-react-chat-app
   ```

2. **Install dependencies**

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment setup**

   ```bash
   # Copy environment variables
   cp .env.example .env

   # Configure your database connection and JWT secret
   # Edit .env file with your database credentials
   ```

4. **Database setup**

   ```bash
   # Run database migrations
   cd server
   npm run db:migrate
   ```

5. **Start the application**

   ```bash
   # Start the backend server
   cd server
   npm run start:dev

   # In a new terminal, start the frontend
   cd client
   npm start
   ```

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **GraphQL Playground**: http://localhost:3000/graphql

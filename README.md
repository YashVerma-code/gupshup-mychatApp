# Gupshup - Real-time Chat Application

**Gupshup** is a full-stack real-time messaging application designed to facilitate seamless communication between users. Built using the MERN stack, it supports one-on-one messaging, group chats, and real-time notifications.

## Features

  * **Authentication & Authorization:** Secure login and signup functionality using JWT (JSON Web Tokens).
  * **Real-time Messaging:** Instant messaging using **Socket.io**.
  * **One-on-One Chat:** Private conversations with other users.
  * **Group Chat:** Create groups, add/remove members, and rename groups.
  * **Typing Indicators:** See when the other user is typing.
  * **User Search:** Search for users to start conversations with.
  * **Profile Management:** View user profiles and manage chat settings.
  * **Responsive Design:** Fully optimized for desktop and mobile devices.

##  Tech Stack

**Frontend:**

  * React.js
  * Context API (State Management)
  * Chakra UI / Material UI / CSS **[Check your package.json to confirm which UI library you used]**
  * Axios

**Backend:**

  * Node.js
  * Express.js

**Database:**

  * MongoDB (Mongoose ODM)

**Real-time Communication:**

  * Socket.io

## Project Structure

```bash
gupshup-mychatApp/
├── frontend/       # React frontend application
├── backend/        # Node.js/Express backend API
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

  * Node.js installed
  * MongoDB installed locally or a MongoDB Atlas account

### 1\. Clone the repository

```bash
git clone https://github.com/YashVerma-code/gupshup-mychatApp.git
cd gupshup-mychatApp
```

### 2\. Backend Setup

Navigate to the backend directory (or root if backend is in root) and install dependencies.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add the following credentials:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Start the backend server:

```bash
npm start
# or
npm run server
```

### 3\. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies.

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm start
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/user/login` | Authenticate user and get token |
| **POST** | `/api/user` | Register a new user |
| **GET** | `/api/user?search=` | Search for users |
| **POST** | `/api/chat` | Create or access a chat |
| **GET** | `/api/chat` | Fetch all chats for the user |
| **POST** | `/api/chat/group` | Create a group chat |
| **POST** | `/api/message` | Send a message |
| **GET** | `/api/message/:chatId` | Fetch all messages for a chat |

## Contributing

Contributions are welcome\!

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License.

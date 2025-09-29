https://noteboard-lhwg.onrender.com
# 📝 MERN Note-Taking App

A simple and intuitive note-taking application built using the **MERN stack** (MongoDB, Express, React, Node.js). This app lets you create, read, update, and delete notes with ease — perfect for learning full-stack development or building your own productivity tools.

---

## 🚀 Features

* 🧾 **Create Notes** – Add new notes with a title and body
* 📋 **View Notes** – See a list of all your saved notes
* 🛠 **Edit Notes** – Update existing notes
* 🗑 **Delete Notes** – Remove notes you no longer need
* ⚡ **Responsive UI** – Clean and fast React interface
* 🔗 **RESTful API** – Backend powered by Express and MongoDB

---

## 🛠 Tech Stack

| Layer    | Technology        |
| -------- | ----------------- |
| Frontend | React, Axios      |
| Backend  | Node.js, Express  |
| Database | MongoDB, Mongoose |

---

## 📦 Installation

> Make sure you have **Node.js** and **MongoDB** installed on your machine.

### 1. Clone the Repository

```bash
git clone git@github.com:Tobi-MX/noteBoard.git
```

### 2. Install Server Dependencies

```bash
cd backend
npm install
```

### 3. Install Client Dependencies

```bash
cd ../frontend
npm install
```

### 4. Create `.env` File in `server/`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 5. Run the App

#### In Development (with concurrently)

```bash
# From root directory
npm run dev
```

#### Or Run Separately

```bash
# Terminal 1: Run server
cd backend
npm run dev

# Terminal 2: Run client
cd frontend
npm run dev
```


## 💡 Future Improvements

* User authentication (JWT)
* Note categories or tags
* Rich-text editing
* Dark mode

---

## 🤝 Contributing

Pull requests are welcome! If you’d like to suggest improvements or report a bug, feel free to [open an issue](https://github.com/Tobi-MX/noteBoard.git/issues).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Happy coding!

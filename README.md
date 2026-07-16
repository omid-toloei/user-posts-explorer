# User Posts Explorer 👥📋

A simple, clean **Vanilla JavaScript** app that uses the `Fetch API` to retrieve and display users, their posts, and post comments from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

## ✨ Features

- Displays a list of users in a table (name and city)
- Click on a user to view their full profile (username, email, phone number) and list of posts
- Click on a post to view its full content and comments
- Error handling (no internet connection, network errors, server errors like 404 / 500 / 503)
- Loading spinner shown while fetching data from the server
- Clean, modern dark-themed UI
- Load more users button

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (ES6+) — `async/await`, `Fetch API`
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a mock REST API

## 📁 Project Structure

```
├── index.html
├── styles/
│   └── styles.css
├── javascript/
│   └── app.js
└── icons/
    ├── at-icon.png
    ├── email-icon.png
    └── phone-icon.png
```


## 📸 How It Works

1. The list of users is displayed on the main page.
2. Clicking on a user row opens a modal showing their profile info and posts.
3. Clicking on a post opens another modal showing the full post content and its comments.

## 📄 License

This project was built for learning and practicing the Fetch API.

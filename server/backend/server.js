const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const usersFile = path.join(__dirname, 'users.json');

// Load users from JSON
const loadUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile, 'utf8');
  return JSON.parse(data || '[]');
};

// Save users to JSON
const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const users = loadUsers();
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  users.push({ name, email, password });
  saveUsers(users);
  res.status(201).json({ message: 'User registered successfully.' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  res.json({ message: 'Login successful.', user: { name: user.name, email: user.email } });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
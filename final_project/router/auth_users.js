// router/users.js
const express = require('express');
const router = express.Router();

let users = {}; // lưu tạm user: {username: password}

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  if (users[username]) {
    return res.status(409).json({ message: 'User already exists' });
  }

  users[username] = password;
  res.status(201).json({ message: 'User registered successfully', username });
});


// ✅ POST login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Kiểm tra thông tin đăng nhập (ví dụ đơn giản)
  if (username === 'newuser' && password === 'password') {
    res.json({ message: 'Login successful', newuser: username });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;

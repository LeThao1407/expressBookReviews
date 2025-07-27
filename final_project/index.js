const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());


const bookRoutes = require('./router/books');
const userRoutes = require('./router/auth_users');

app.use(express.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

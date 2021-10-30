import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(express.json());

const database = {
  users: [
    {
      id: '1',
      username: 'makonnen',
      password: 'mike',
      joined: new Date(),
      exam: ['text book', 'buy indomie for exam'],
      wedding: ['weddddd', 'more wedding', 'and more wedding']
    },
    {
      id: '2',
      username: 'tchellino',
      password: 'mitchelle',
      joined: new Date()
    }
  ]
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', (req, res) => {
  if (req.body.username === database.users[0].username && req.body.password === database.users[0].password) {
    res.json('success');
  } else {
    res.status(400).json('error loggin in');
  }
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  database.users.push({
    id: '3',
    username,
    password,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:username', (req, res) => {
  const { username } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.username === username) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json('this user does not exist');
  }
});

app.get('/list/:title', (req, res) => {
  const { title } = req.params;
  database.users.forEach((user) => {
    if (title.match(user)) {
      return res.json(user);
    } else {
      res.json('list does not exist');
    }
  });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

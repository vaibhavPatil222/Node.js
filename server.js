const express = require ('express')
const mysql = require ('mysql')
const path = require ('path')
const app = express();
const port = 3000;


const db = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: 'vsp1338',
  database: 'students',
});

db.connect((err) => {
  if (err) {
    console.log('mysql fail', err);
  } else {
    console.log('Connected to mysql');
  }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/index.html');
    
  });

  
app.post('/create', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO students (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  

  app.get('/users', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

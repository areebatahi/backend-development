import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

let users = []

app.use(cors())
app.use(express.json()) // data ko convert kry ga { json sy js }

// getting data from server
app.get('/', (req, res) => {
  console.log('hi');
  res.send('Hello!')
})

app.get('/users', (req, res) => {
  res.send(users)
})

// add data in server
app.post('/users', (req, res) => {
  console.log(req.body); // data ko server sy ly ga
  // users.push({ ...req.body, id: users.length + 1 }); // push in array mehod 1
  users.push({ ...req.body, id: Date.now().toString(36) }); // push in array mehod 2
  res.send('user added successfully');
})

// delete data in server
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  // good mehod 2 time loop work
  const index = users.findIndex(user => user.id === id);
  users.splice(index, 1)
  // 1 time loop work 
  users = users.filter(obj => obj.id !== id)
  res.send({ users, mss: 'user delete successfully' });
})

// update data in server
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id);
  users.splice(index, 1, { ...req.body, id });
  res.send({ user: req.body, mss: 'user update successfully', ...users });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) // show in terminal 
})
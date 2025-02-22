import express from 'express'
const app = express()
const port = process.env.PORT || 3000

let users = []

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
app.post('/useradd', (req, res) => {
  console.log(req.body); // data ko server sy ly ga
  users.push({ ...req.body, id: users.length + 1 }); // push in array 
  res.send('user added successfully');
})

// delete data in server
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === parseInt(id));
  users.splice(index, 1)
  res.send({ users });
})

// update data in server
app.put('/users/:id',(req, res)=>{

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) // show in terminal 
})
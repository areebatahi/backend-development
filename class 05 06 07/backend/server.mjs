import express from 'express'
import cors from 'cors'
import schema from "./schema/index.mjs";

const app = express()
const port = process.env.PORT || 3000

let users = []

app.use(cors())
app.use(express.json()) // data ko convert kry ga { json sy js }
app.use('/',(req,res,next)=>{
  console.log("Request URL:", req.url, "method: ", req.method);
  next()
})


// getting data from server
app.get('/', (req, res) => {
  console.log('hi');
  res.send('Hello!')
})

app.get('/users', (req, res) => {
  res.send(users)
})

// add data in server
app.post('/users', async(req, res) => {
  try {
    await schema.validateAsync(req.body)
    console.log(req.body); // data ko server sy ly ga
    // users.push({ ...req.body, id: users.length + 1 }); // push in array mehod 1
    users.push({ ...req.body, id: Date.now().toString(36) }); // push in array mehod 2
    res.send('user added successfully');
  } catch (err) {
    res.status(400).send({error:err || "Something went wrong", status:400});
  }
})

// delete data in server
app.delete('/users/:id', (req, res) => {
  try {
  const { id } = req.params;
  // good mehod 2 time loop work
  const index = users.findIndex(user => user.id === id);
  users.splice(index, 1)
  // 1 time loop work 
  users = users.filter(obj => obj.id !== id)
  res.send({ users, mss: 'user delete successfully' });
} catch (err) {
  res.status(400).send({error:err || "Something went wrong", status:400});
}
})

// update data in server
app.put('/users/:id', (req, res) => {
  try {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id);
  users.splice(index, 1, { ...req.body, id });
  res.send({ user: req.body, mss: 'user update successfully', ...users });
} catch (err) {
  res.status(400).send({error:err || "Something went wrong", status:400});
}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) // show in terminal 
})
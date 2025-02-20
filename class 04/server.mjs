import express from 'express';
import path from 'path'
const app = express()
const __dirname = path.resolve();
const port = process.env.PORT || 3000

app.get('/profile', (req, res) => {
    console.log(req.ip);
  res.send('Hello World!')
})
// http://192.168.6.101:3000
app.use(express.static(path.join(__dirname, 'application/dist')))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

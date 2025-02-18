import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
const port = process.env.PORT || 3003

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/weather/:cityName', (req, res) => {
    console.log("Weather App"); 
  let weatherData ={
        karachi: {
            city: "Karachi",
            tempInc: 27,
            humidity: 56,
            high: 32,
            low: 23
        },
         lahore: {
            city: "lahore",
            tempInc: 15,
            humidity: 25,
            high: 30,
            low: 18
        }
    }
    let userInputCity = req.params.cityName.toLowerCase();
    let weatherDataToSend = weatherData[userInputCity];
    if(weatherDataToSend){
      res.send(weatherDataToSend);
    }else{
      res.status(404).send(`Data for ${req.params.cityName} not found`);
    }
})

//  192.168.228.21:3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
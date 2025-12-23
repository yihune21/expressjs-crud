import  {cities}  from "./cities";

const express = require('express')
const app = express()
const port = 3000



app.get('/health', (req, res) => {
  res.send('The server is running!')
})

app.get('/cities' , (req , res)=>{
   res.send(cities)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const express = require('express')
const app = express()



const port = 5000


app.use(express.static("public"))



app.get("/app", (req, res) => {
   const method = req.method
      res.send({method: method})
});


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))
  

const express = require ('express')
require('./config/config.js')
const port = process.env.PORT 
const router = require('./router.js')

const app = express()
app.use(express.json())
app.use(router)
app.get('/', async (req, res)=>{
res.send('Welcome')
})

app.listen(port,()=>{
    console.log(`Server is listening on port  ${port}`)
})
const mongoose = require ("mongoose");
require("dotenv").config();

const db = process.env.MONGO_URI
mongoose.connect(db)
.then(()=>{
    console.log("Database connection established successfully")
})
.catch((err)=>{
    console.log(`Unable to connect to database ${err}`)
})
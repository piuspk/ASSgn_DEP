const mongoose = require("mongoose");
const db = process.env.DB;




mongoose.connect(db,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(()=>console.log("Successfully Connected to Database!!"))
.catch((error)=>console.error("error",error))
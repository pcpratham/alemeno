const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const cors = require("cors")
app.use(cors());
app.use(express.json());

app.listen(5000,(req,res)=>{
    console.log("Server is running on port 5000");
})


dbConnect();

app.use("/api/courses",require("./routes/course"));

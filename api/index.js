require("dotenv").config();
const errorMiddleware = require("./Middleware/error-middleware");
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const connectDbs = require("./Database/connection");
const app = express();
const port = process.env.PORT || 8000;
const userroute = require('./Route/user-route');
const authroute = require('./Route/auth-route');
const  listroute = require('./Route/list-route');
const corsOptions = {
  origin:"http://localhost:5173",
  methods:"POST,GET,PUT,DELETE,PATCH",
  credentials:true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/user",userroute);
app.use("/api/auth",authroute);
app.use("/api/list",listroute);

const dirname = path.resolve()
app.use(express.static(path.join(dirname,"/client/dist")));


app.get("*",(req,res)=>{

  res.sendFile(path.join(dirname,"client","dist","index.html"))
});

app.use(errorMiddleware);



connectDbs().then(() => {
  app.listen(port, () => {
    console.log(`listening at port ${port}`);
  })
});

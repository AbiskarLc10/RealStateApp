const mongoose = require('mongoose');
const url =  process.env.DATABASE_URL;
const connectDbs = async () =>{
      await mongoose.connect(url).then(()=>{

        console.log("Connected to Database Successfully")
      }).catch((err)=>{
        console.log(err);
      });
 
        

};

module.exports = connectDbs;

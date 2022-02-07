import mongoose  from "mongoose";

const Connection =async ()=>{
    const URL=`mongodb://127.0.0.1:27017/docs`

   try{
     await  mongoose.connect(URL,{useUnifiedTopology:true, useNewUrlParser:true})
     console.log("connected database")
   }catch(error){
       console.log(error)
   }
} 

export default Connection
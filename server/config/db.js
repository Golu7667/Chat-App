const mongoose=require('mongoose')


const connectDatabase = ()=>{
  mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true ,w: 'majority' })
  .then(()=>{
    console.log("Mongoose connected")
  }).catch((error)=>{
    console.log(error)  
  })
}

module.exports = connectDatabase;    

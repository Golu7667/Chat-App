const mongoose=require('mongoose')


const connectDatabase = ()=>{
  mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true ,w: 'majority' })
  .then(()=>{
    console.log("Mongoose connected")
  }).catch((error)=>{
    console.log(error)
  })
}

module.exports = connectDatabase;   

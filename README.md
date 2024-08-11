# Connecte to the  Mongo Db using mongoose    

## connection function  in localhost mongodb  
// coonect to  MongoDb 
const   connectDB  = async () => {
    try {
        const  conn  =  await  mongoose.connect(process.env.MONGO_URI  ,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
  
        });  
        console.log(`MongoDb Connected :  ${conn.connection.host}`);

    }catch(error){
        console.log(`error  :  ${error.message}`);
        process.exit(1);   

    }
};;  

// Call  mongoDb function to connect to  database 
connectDB() ; 

const express = require('express');
const dotenv = require('dotenv');
const  mongoose = require('mongoose')  ;  
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes')
// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to use authroutes 
app.use('/api', authRoutes);

// Task Routes
app.use('/api/task', taskRoutes);




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

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

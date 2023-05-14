const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app =express()
const port = process.env.PORT || 5000;


// Middleware
app.use(cors())
app.use(express.json());

// FoodeWeb
// Nd2ybt3EvnZ3sr3S

console.log(process.env.DB_FOOD_USER,process.env.BD_FOOD_PASS);

// const uri = "mongodb+srv://FoodeWeb:Nd2ybt3EvnZ3sr3S@cluster0.fnxcgsn.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_FOOD_USER}:${process.env.BD_FOOD_PASS}@cluster0.fnxcgsn.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('Hallo foood commining !!')
})

app.listen(port,()=>{
    console.log('Food server is running',port);
})
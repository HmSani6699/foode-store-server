const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


// Middleware
app.use(cors())
app.use(express.json());

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

        const foodsCollection = client.db('foodsDB').collection('foods')

        // Read
        app.get('/foods', async (req, res) => {
            const cursor = foodsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        // Read to single food
        app.get('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await foodsCollection.findOne(query);
            res.send(result)
        })

        // Creat 
        app.post('/foods', async (req, res) => {
            const newFoods = req.body;
            // Data send to mongodb
            const result = await foodsCollection.insertOne(newFoods);
            res.send(result)
        })

        // Update

        app.put('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const food = req.body;
            const updateFood = {
                $set: {
                    name: food.name,
                    quantity: food.quantity,
                    supplier: food.supplier,
                    teste: food.teste,
                    category: food.category,
                    details: food.details,
                    photo: food.photo,
                }
            }

            const result =await foodsCollection.updateOne(filter,updateFood,options);
            res.send(result)
        })

        // Delete
        app.delete('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await foodsCollection.deleteOne(query);
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hallo foood commining !!')
})

app.listen(port, () => {
    console.log('Food server is running', port);
})
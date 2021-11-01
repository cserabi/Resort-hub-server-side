const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;



//middleware

app.use(cors());

app.use
app.use(express.json());


const uri = `mongodb+srv://${procss.env.DB_USER}:${process.env.DB_password}@cluster0.chwoh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
  try {
    await client.connect();
    const database = client.db("insertDB");
    const userCollection = database.collection("user");

    const database_tour = client.db("TourPlace");

    const userCollection_tour = database_tour.collection("place");

    // create a document to insert

    //Get api


    app.get('/users', async (req, res) => {
      const cursor = userCollection.find({});

      const users = await cursor.toArray();
      res.send(users);

    })

    //Get API

    app.get('/tourplace', async (req, res) => {
      const cursor = userCollection_tour.find({});
      const place = await cursor.toArray();
      res.send(place);
    })


    // single user display

    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };

      console.log(query);
      const user = await userCollection.findOne(query);

      console.log('load user with id: ', id);
      res.send(user);
    })



    // post API
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      console.log('hitting the post', req.body);
      console.log('added user ', result)
      res.send('hit the post');
    })

    //Update api

    app.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const updateUser = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updateUser.name,
          Day: updateUser.Day,
          phone: updateUser.phone,
          image: updateUser.image

        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, options)

      console.log('updating user', req)
      res.json(result);
    })


    //Delete API 
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      // 
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      console.log('deleting user with id', result);
      res.json(result);

    })

  } finally {
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Running my Curd server');

});


app.listen(port, () => {
  console.log('Running my curd server on port')
})


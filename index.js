const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middle ware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("job task server is running");
});

// Database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t4uwg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const infoCollection = client.db("job_task").collection("information");
  try {
    // info post api
    app.post("/info", async (req, res) => {
      const info = req.body;
      console.log(info);
      const result = await infoCollection.insertOne(info);
      res.send(result);
    });

    // info get api
    app.get("/info", async (req, res) => {
      const query = {};
      const result = await infoCollection.find(query).toArray();
      res.send(result);
    });

    // info get api
    app.delete("/info/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await infoCollection.deleteOne(filter);
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log("job task server is running");
});

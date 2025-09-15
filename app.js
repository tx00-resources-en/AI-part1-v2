const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const generateText  = require("./controllers/fitnessController");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.post('/api/generate-text-v2',generateText );


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




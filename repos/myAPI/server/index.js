const express = require("express");
const bodyParser = require("body-parser");
const {
  getAllCharacters,
  addCharacter,
  updateCharacter,
  deleteCharacter,
  getRequests,
} = require("../db/queries");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Request logging middleware
app.use(async (req, res, next) => {
  const { method, url } = req;
  await logRequest(method, url);
  next();
});

// API Endpoints
app.get("/characters", async (req, res) => {
  try {
    const characters = await getAllCharacters();
    res.json(characters);
  } catch (error) {
    next(error);
  }
}); // End of get

app.post("/characters", async (req, res) => {
  try {
    const newCharacter = await addCharacter(req.body);
    res.status(201).json(newCharacter);
  } catch (error) {
    next(error);
  }
}); // End of post

app.put("/characters/:id", async (req, res) => {
  try {
    const updatedCharacter = await updateCharacter(req.params.id, req.body);
    res.json(updatedCharacter);
  } catch (error) {
    next(error);
  }
}); // End of put

app.delete("/characters/:id", async (req, res) => {
  try {
    await deleteCharacter(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}); // End of delete

app.get("/requests", async (req, res) => {
  try {
    const requests = await getRequests();
    res.json(requests);
  } catch (error) {
    next(error);
  }
}); // End of get (requests)

// 404 Handler
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Error Handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT${PORT} `);
});

async function logRequest(method, url) {
  // Implement logging function here
}

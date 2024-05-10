import express from "express";
import bodyParser from "body-parser";
import { jokes } from "./data/jokes.js";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 4000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET a random joke
app.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
});

// GET a joke by id
app.get("/jokes/:id", (req, res) => {
  const id = req.params.id;
  const jokeById = jokes.find((joke) => joke.id == id);
  res.json(jokeById);
});

// GET a jokes by filtering on the joke type
app.get("/filter", (req, res) => {
  const type = req.query.type;
  const filteredJokes = jokes.filter((joke) => joke.jokeType == type);
  res.json(filteredJokes);
});

// POST a new joke
app.post("/jokes", (req, res) => {
  const newJoke = {
    id: uuidv4(),
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  jokes.push(newJoke);
  res.json(newJoke);
});

// PUT a joke (Replace one completely given the id)
app.put("/jokes/:id", (req, res) => {
  const id = req.params.id;
  const updatedJoke = {
    id: id,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  const searchIndex = jokes.findIndex((joke) => joke.id == id);
  jokes[searchIndex] = updatedJoke;
  res.json(updatedJoke);
});

// PATCH a joke (Update the type or the text of a joke given the id)
app.patch("/jokes/:id", (req, res) => {
  const id = req.params.id;
  const existingJoke = jokes.find((joke) => joke.id == id);
  const updatedJoke = {
    id: id,
    jokeText: req.body.text || existingJoke.jokeText,
    jokeType: req.body.type || existingJoke.jokeType,
  };
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  jokes[searchIndex] = updatedJoke;
  res.json(updatedJoke);
});

// DELETE a joke by id
app.delete("/jokes/:id", (req, res) => {
  const id = req.params.id;
  const searchIndex = jokes.findIndex((joke) => joke.id == id);
  if (searchIndex > -1 && searchIndex < jokes.length + 1) {
    jokes.splice(searchIndex, 1);
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: `Joke with id: ${id} not found. No jokes were deleted.` });
  }
});

// DELETE all jokes
app.delete("/all", (req, res) => {
  const userKey = req.query.key;
  if (userKey === masterKey) {
    jokes = [];
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: `You are not authorized to perform this action.` });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost: ${port}`);
});

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Render main page with a random joke and filtered jokes
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/random`);
    const filteredJokes = [];
    res.render("index.ejs", { randomJoke: response.data, filteredJokes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching jokes" });
  }
});

// Display filtered jokes
app.post("/", async (req, res) => {
  try {
    //Get the type of joke
    const type = req.body.type;
    const response = await axios.get(`${API_URL}/filter?type=${type}`);

    // Send the filtered jokes as JSON response
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching jokes" });
  }
});

// Delete a joke by id
app.get("/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/jokes/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting joke" });
  }
});

// Render the form to create a new joke
app.get("/new", (req, res) => {
  res.render("post-form.ejs", {
    heading: "New Joke",
    submit: "Create Joke",
    joke: null,
    API_URL: API_URL,
  });
});

// Render the edit form for a specific joke
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/jokes/${req.params.id}`);
    res.render("post-form.ejs", {
      heading: "Edit Joke",
      submit: "Update Joke",
      joke: response.data,
      API_URL: API_URL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching joke for editing" });
  }
});

// Update an existing joke
app.patch("/jokes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type, text } = req.body;
    const response = await axios.patch(`${API_URL}/jokes/${id}`, {
      type,
      text,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating joke" });
  }
});

// Create a new joke
app.post("/jokes", async (req, res) => {
  try {
    const { type, text } = req.body;
    const id = null;
    const response = await axios.post(`${API_URL}/jokes`, { type, text });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating joke" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});

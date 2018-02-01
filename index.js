const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const url = "mongodb://aids:aids@ds121088.mlab.com:21088/phonebook";

mongoose.connect(url);
mongoose.Promise = global.Promise;

const Person = mongoose.model("Person", {
  name: String,
  number: String
});

app.use(cors());
app.use(bodyParser.json());
morgan.token("type", function(req, res) {
  if (req.body.name !== undefined) {
    return JSON.stringify(req.body);
  } else {
    return null;
  }
});
app.use(
  morgan(":method :url :type :status :res[content-length] - :response-time ms ")
);
app.use(express.static("build"));

const formatPerson = person => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  };
};

app.get("/info", (req, res) => {
  res.send(
    `There are currently ${
      persons.length
    } entries in the phonebook. <br> ${new Date()}`
  );
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    console.log("adoiasoidjo");
    response.json(persons.map(formatPerson));
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});
app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  let names = persons.map(person => person.name);
  console.log(names);
  console.log(body.name);
  if (names.includes(body.name)) {
    console.log("not unique");
    return response.status(400).json({ error: "Name must be unique." });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))
  };
  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

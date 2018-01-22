const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arttu Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
];

app.get("/info", (req, res) => {
  res.send(
    `There are currently ${
      persons.length
    } entries in the phonebook. <br> ${new Date()}`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
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
  if (persons.map(person => person.id === body.name)) {
    return response.status(400).json({ error: "Name must be unique." });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))
  };
  persons.concat(person);

  response.json(person);
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);

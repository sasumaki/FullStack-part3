const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/book");
const nocache = require("nocache");

app.use(nocache());
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

app.get("/info", (req, res) => {
  Person.find({}).then(persons => {
    const amountOfPeople = persons.length;
    res.send(
      `There are currently ${amountOfPeople} entries in the phonebook. <br> ${new Date()}`
    );
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    console.log("adoiasoidjo");
    res.json(persons.map(Person.format));
  });
});

app.get("/api/persons/:id", (request, response) => {
  console.log(request.params.id);
  Person.findById(request.params.id)
    .then(person => {
      console.log(person);
      response.json(Person.format(person));
    })
    .catch(error => {
      console.log(error + "EI löyTYNT");
    });
});
app.delete("/api/persons/:id", (request, response) => {
  console.log(request.params.id);
  Person.deleteOne({ _id: request.params.id }, function(err) {});
  response.status(204).end();
});
app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  //let names = persons.map(person => person.name);
  //console.log(names);
  //console.log(body.name);
  //if (names.includes(body.name)) {
  //console.log("not unique");
  //return response.status(400).json({ error: "Name must be unique." });
  //}
  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))
  });

  Person.find({}).then(persons => {
    console.log("adoiasoidjo");
    let names = persons.map(Person.format).map(person => person.name);
    if (names.includes(body.name)) {
      Person.findOne({ name: body.name }).then(p => {
        console.log(p);
        p.number = body.number;
        console.log(p);
        p.save().then(savedPerson => {
          response.json(Person.format(savedPerson));
        });
      });
    } else {
      person.save().then(savedPerson => {
        response.json(Person.format(savedPerson));
      });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

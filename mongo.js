const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const url = process.env.MONGODB_URI;

mongoose.connect(url);
mongoose.Promise = global.Promise;

const Person = mongoose.model("Person", {
  name: String,
  number: String
});

if (process.argv[2] !== undefined) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  });
  person.save().then(response => {
    console.log("person saved!");
    mongoose.connection.close();
  });
} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
      mongoose.connection.close();
    });
  });
}

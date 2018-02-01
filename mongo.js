const mongoose = require("mongoose");

const url = "mongodb://aids:aids@ds121088.mlab.com:21088/phonebook";

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

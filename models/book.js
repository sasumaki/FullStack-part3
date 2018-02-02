const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const url = "mongodb://aids:aids@ds121088.mlab.com:21088/phonebook";

mongoose.connect(url);
mongoose.Promise = global.Promise;
var personSchema = new Schema({ name: String, number: String });
personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  };
};
const Person = mongoose.model("Person", personSchema);

module.exports = Person;

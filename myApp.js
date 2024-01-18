require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  });

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
    const doc = new Person({"name": "test", "age": 20, "favoriteFoods": ["apple"]});
    doc.save(done);
};

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, done);
};

const findPeopleByName = (personName, done) => {
    Person.find({name: personName}, done);
};

const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, done);
};

const findPersonById = (personId, done) => {
    Person.findById(personId, done);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
        person.favoriteFoods.push(foodToAdd);
        person.save(done);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, (err, person) => {
    person.age = ageToSet;
 }, { new: true }, done);
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, done);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({name: nameToRemove}, done);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
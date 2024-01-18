let mongoose = require('mongoose');

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection error');
      });
  }
}

new Database();

let personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: [String]
  });

module.exports = mongoose.model('Person', personSchema);

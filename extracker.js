const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const exerciseSchema = new mongoose.Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: Date
});
const Exercise = mongoose.model("Exercise", exerciseSchema);

const userSchema = new mongoose.Schema({
    username: {type: String, required: true}
});
const User = mongoose.model("User", userSchema);


// http://expressjs.com/en/starter/basic-routing.html
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/extracker.html');
});

router.route('/api/users')
.get((req, res) => User.find({}).then((data) => res.json(data)))
.post((req, res) => {
    const user = {username: req.body.username};
    User.create(user).then(data => res.json(data));
});

router.post('/api/users/:_id/exercises', (req, res) => {
    const exercise = {...req.body};
    if (!exercise.date) {
        exercise.date = new Date();
    }
    User.findById(req.params._id)
    .then((user) => exercise.username = user.username)
    .then(() => Exercise.create(exercise).then(ex => {
        res.json({_id: user._id, username: user.username, description: ex.description, duration: ex.duration, date: ex.date.toDateString()});
    }))});

const LIMIT = 100;
const FROM_DATE = '1990-01-01';
const TO_DATE = '2990-01-01';
router.get('/api/users/:_id/logs', (req, res) => {
    User.findById(req.params._id)
    .then((user) => {
        Exercise
        .find({username: user.username, date: { $gte: req.query.from || FROM_DATE, $lte: req.query.to || TO_DATE}})
        .limit(req.query.limit || LIMIT)
        .select({username: false, _id: false, __v: false}).then((ex) => {
            const exercises = ex.map(e => { return{description: e.description, duration: e.duration, date: e.date.toDateString()}});
            res.json({_id: user._id, username: user.username, count: exercises.length, log: exercises});
        });
    });
})

module.exports = router;
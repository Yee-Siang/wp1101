import express from 'express';
import dotenv from "dotenv-defaults";
import mongoose from 'mongoose';
import User from './models/user';
import cors from 'cors';
import bodyParser from 'body-parser';
import { outputHelp } from 'commander';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true,
})
    .then((res) => console.log("mongo db connection created."));

const app = express();
const port = process.env.PORT || 5000;

const saveUser = async (name, subject, score) => {
    const existing = await User.findOne({ name: name, subject: subject });
    //if (existing) throw new Error(`data ${name} exists!!`);
    if (existing) {
        try {

            ////////////////////
            var myquery = { name: name, subject: subject };
            var newvalues = { $set: { score: score } };
            User.updateOne(myquery, newvalues, function (err, res) { })
            ///////////////////
            return `Updating(${name},${subject},${score})`;
        } catch (e) { throw new Error("User Criterion Error: " + e); }
    }
    else {
        try {
            const newUser = new User({ name, subject, score });
            console.log("Created user", newUser);
            const re = newUser.save();
            return `Adding(${name},${subject},${score})`;
        } catch (e) { throw new Error("User Criterion Error: " + e); }
    }

};

const deleteDB = async () => {
    try {
        await User.deleteMany({});
        console.log("Database Deleted");
        //  return "Database Cleared";
    } catch (e) { throw new Error("Database deletion failed.") };
};

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Received a GET HTTP method');
    console.log(req);
});

app.post('/', (req, res) => {
    console.log(req);
    res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
    res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    res.send('Received a DELETE HTTP method');
});

app.delete('/api/clear-db', async (req, res) => {
    console.log(req);
    await deleteDB();
    res.json({ message: 'Database cleared' })
});

app.post('/users', (req, res) => {
    res.send('POST HTTP method on users resource')
});

app.put('/users/:userID', (req, res) => {
    res.send(`PUT HTTP method on users/${req.params.userID} resource`,)
})

app.post('/api/create-card', async (req, res) => {
    console.log(req.body.name);
    let name = req.body.name;
    let subject = req.body.subject;
    let score = req.body.score;
    const response = await saveUser(name, subject, score);
    console.log(response);
    res.json({ message: `${response}`, card: 'ok' })
})

app.post('/api/query-cards', async (req, res) => {
    let queryType = req.body.queryType;
    let queryString = req.body.queryString;
    console.log(queryType);
    console.log(queryString);
    let existing;
    if (queryType === 'name') { existing = await User.find({ name: `${queryString}` }); }
    else { existing = await User.find({ subject: `${queryString}` }); }
    let out = existing.map(e => `(${e.name}, ${e.subject}, ${e.score})`);
    //let out = existing.map(e => (e.name, e.subject, e.score));
    let templateString;
    if (out.length === 0) { templateString = [`${queryType} (${queryString}) not found!`] }
    // else { templateString = `${out.join(",\n")}`; }
    else { templateString = out }
    console.log(templateString)
    res.json({ messages: templateString })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

const db = mongoose.connection;


db.on("error", (err) => console.log(err));
db.once("open", async () => {
    // await deleteDB();
    //await saveUser('Sally', "IC_design", 100);
});


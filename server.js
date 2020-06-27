var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err);
    const db = client.db('memo-store');
    const usersCollection = db.collection('users'); 

    app.use(cors());
    
    app.use(bodyParser.json());
    
    
    app.post('/', function (req, res){
        const newDoc = {_id: req.body.username, password: req.body.password, memo: req.body.memo};
        usersCollection.insertOne(newDoc)
        .then(res.send('Success')) 
        .catch(err => console.log(error)); 
    })


    app.post('/:username', function (req, res){
        usersCollection.findOne({ _id: req.params.username })
        .then((result) => { 
            if(result.password === req.body.password){
                res.send(result);
            }
            res.status(400).send();
        })
        .catch((error) => {res.status(400).send()});
    })

    app.listen(4001, () => {
        console.log('I am listening!');
    })

});
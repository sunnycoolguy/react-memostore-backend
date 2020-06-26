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
        usersCollection.insertOne(req.body)
        .then(res.send('hello!')) 
        .catch(err => console.log(error));
    })


    app.post('/:username', function (req, res){
        usersCollection.findOne({username : req.params.username})
        .then((error) => {res.status(400).send()}, (result) => { 
            if(result.password === req.body.password){
                res.send(result);
            }
            res.status(400).send();
        });
    })

    app.listen(4001, () => {
        console.log('I am listening!');
    })

});
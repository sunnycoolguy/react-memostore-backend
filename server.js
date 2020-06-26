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


    app.get('/:username', function (req, res){
        usersCollection.findOne({username : req.params.username})
        .then((result) => { res.send(result) })
        .catch(console.log(err));
    })

    app.listen(4001, () => {
        console.log('I am listening!');
    })

});

/*
var mongo = require('mongodb');


var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
    if(err) throw err;
    var dbo = db.db('mydb');
    var myobj = { name: 'Senay' , address : 'Real Nigga Town'};
    dbo.collection("customers").insertOne(myobj, function(err, res){
        if(err) throw err;
        console.log("REAL NIGGA TOWN STAND UP");
        db.close();
    });
});
*/
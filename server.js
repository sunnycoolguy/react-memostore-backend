var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : true }));


app.post('/', function (req, res){
    console.log(req.body);
    res.send('wow');
})


app.get('/', function (req, res){
    res.send('Hey I\'m here for the interview!');
})

app.listen(4001, () => {
    console.log('I am listening!');
})



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
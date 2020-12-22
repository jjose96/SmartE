const express = require('express');
const path = require('path')
var cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken');
app.use(cors());
const body_parser = require('body-parser');
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));
var admin = require("firebase-admin");
var serviceAccount = require("./smarte-8f70f-firebase-adminsdk-dc8il-f047b8760f.json");
const { ElementSchemaRegistry } = require('@angular/compiler');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smarte-8f70f.firebaseio.com"
});
var db = admin.firestore();
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
app.get('/*', function(req, res) {

  res.sendFile(path.join(__dirname + '/dist/SmartE/index.html'));
});

const accessTokenSecret = 'youraccesstokensecret';

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, accessTokenSecret, (err, user) => {
    console.log(err)
    if (err) return res.status(403).json({"message":"Access denied"})
    req.user = user.board
    next() // pass the execution off to whatever request the client intended
  })
}


app.post('/api/login', function(req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    var status=0;
    let UserRef = db.collection('Users').where("user","==",user).where("pass","==",pass);
    UserRef.get()
    .then(function(q) {
      q.forEach(function(doc) {
            if(doc.exists){
              const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);
              res.status(200).json({"status":"1","auth":accessToken})
              status=1
            }
          })
          if(status==0){
            res.status(200).json({"status":"0"})
          }
      });
    });

    app.post('/api/blogin', function(req, res) {
      var user = req.body.username;
      var pass = req.body.password;
      var status=0;
      let UserRef = db.collection('BoardUsers').where("user","==",user).where("password","==",pass);
      UserRef.get()
      .then(function(q) {
        q.forEach(function(doc) {
              if(doc.exists){
                const accessToken = jwt.sign({ board: doc.data().user }, accessTokenSecret);
              res.status(200).json({"status":"1","auth":accessToken})
                status=1
              }
            })
            if(status==0){
              res.status(200).json({"status":"0"})
            }
        });
      });

      app.post("/api/boardInfo",authenticateToken, function(req, res) {
        let UserRef = db.collection('BoardUsers').where("user","==",req.user);
      UserRef.get()
      .then(function(q) {
        q.forEach(function(doc) {
              if(doc.exists){
                    res.status(200).json({ 'status':1,'name':doc.data().name});
              }
              else{
                res.status(200).json({ 'status':0,name:'invalid user'});
              }
              });
            });
                });
    app.listen(3000);

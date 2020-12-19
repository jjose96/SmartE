const express = require('express');
const path = require('path')
var cors = require('cors')
const app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cookieParser());
app.use(session({ secret: "SomethingThatNot@Break" }));
app.use(cors());
const body_parser = require('body-parser');
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));
var admin = require("firebase-admin");
var serviceAccount = require("./smarte-8f70f-firebase-adminsdk-dc8il-f047b8760f.json");
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


app.post('/api/login', function(req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    var status=0;
    let UserRef = db.collection('Users').where("user","==",user).where("pass","==",pass);
    UserRef.get()
    .then(function(q) {
      q.forEach(function(doc) {
            console.log(doc.data())
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
              console.log(doc.data())
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

      app.post("/api/boarduser", function(req, res) {
        console.log(req.session.username);

        if (req.session.username === undefined) {
            res.status(200).json({ 'status': 0 });
        } else {
          let UserRef = db.collection('BoardUsers').where("user","==",user);
          UserRef.get()
          .then(function(q) {
            q.forEach(function(doc) {
                  console.log(doc.data())
                  if(doc.exists) {
                        req.session.name = doc.data().name;
                    }
                    res.status(200).json({ 'status': 1, 'User': req.session.name });
                });
        });
      }
    });
app.listen(3000);

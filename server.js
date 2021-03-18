const express = require('express');
const path = require('path')
var cors = require('cors')
const app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
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
app.post('/api/login', function(req, res) {
    var user = req.body.user;
    var pass = req.body.pass;
    var status = 0;
    console.log(user, pass)
    let UserRef = db.collection('Users').where("user", "==", user).where("pass", "==", pass);
    UserRef.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.data())
                if (doc.exists) {
                    res.status(200).json({ "status": "1" })
                    status = 1
                }
            })
            if (status == 0) {
                res.status(200).json({ "status": "0" })
            }
        });
});
app.listen(process.env.PORT || 8080);

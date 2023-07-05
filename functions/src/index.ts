"use strict";

const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");

const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();


// [START addmessage]
// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
// [START addmessageTrigger]
exports.addmessage = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (req: any, res: any) => {
    // [END addmessageTrigger]
    // Grab the text parameter.
    const original = req.query.text;
    // [START adminSdkAdd]
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await getFirestore()
        .collection("messages")
        .add({original: original});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
    // [END adminSdkAdd]
  }
);


// exports.getUsers = onRequest(
//   { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
//   async (req: any, res: any) => {
//     const users = await getFirestore().collection("users").get()

//     let result: any[] = [];

//     users.forEach((doc: any) => {
//       result.push(doc.data())
//     });

//     res.json(result);
//   }
// );

// exports.addUser = onRequest(
//   { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
//   async (req: any, res: any) => {
    
//     const body = req.body;

//     const newUser = await getFirestore().collection("users").add({
//       username: body.username,
//       id: Math.random()
//     })

//     // setTimeout(function() {
//     //   res.json({ data: newUser });
//     // },500);
//     res.json({ data: newUser });
//   }
// );

exports.login = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (req: any, res: any) => {
    
    const body = req.body;

    const userQuery = await getFirestore()
      .collection("users")
      .where('username', '==', body.login)
      .get();
    if(userQuery.empty) {
      res.status(404).json('No such user')
      return;
    }

    let token = Math.random().toString();

    let user: {username: string; password: string; token: string;} = {
      username: '',
      password: '',
      token
    }; 
    userQuery.forEach((doc: any) => {
      if(!doc.data().token) {
        doc.ref.set({
          token: user.token
        }, { merge: true })
        user.username = doc.data().username;
        user.password = doc.data().password;
        return;
      }
      user = doc.data();
    });

    if(user.password !== body.password ) {
      res.status(401).json('Password incorrect')
      return;
    }
    
    res.send({ msg: 'OK', data: user.token })
  }
);
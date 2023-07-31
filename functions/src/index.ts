"use strict";

const https = require("https");
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");

const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

exports.getDunderlist = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (req: any, res: any) => {
    const list = await getFirestore().collection("dunderlist").get()

    let result: any[] = [];

    list.forEach((doc: any) => {
      result.push(doc.data())
    });

    res.json({ success: true, data: { list: result } });
  }
);

exports.getPlayedlist = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (req: any, res: any) => {
    const limit: number = 10;
    const list = await getFirestore().collection("playedlist").orderBy("playedDate", "desc").limit(limit).get();
    const collection = await getFirestore().collection("playedlist").get();
    const gamesQuantity = collection.docs.length;
    let result: any[] = [];

    list.forEach((doc: any) => {
      result.push(doc.data())
    });

    if(list.docs.length < limit) {
      res.send({
        success: true,
        data: {
          list: result,
          isLoadable: false,
          gamesQuantity,
        }
      })
      return;
    }

    res.send({
      success: true,
      data: {
        list: result,
        isLoadable: true,
        gamesQuantity,
      }
    })
  }
);

exports.login = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (req: any, res: any) => {
    
    const body = req.body;
    const userQuery = await getFirestore()
      .collection("users")
      .where("username", "==", body.login)
      .get();
    if(userQuery.empty) {
      res.send({ success: false, msg: "Такого дундика не існує." })
      return;
    }

    let token = Math.random().toString();

    let user: {username: string; password: string; token: string;} = {
      username: "",
      password: "",
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
      res.send({
        success: false,
        msg: "Неправильний пароль. Запам\'ятай, пароль: 'ТЕТРІАНДОХ'." 
      })
      return;
    }
    
    res.send({ success: true, data: { userToken: user.token } })
  }
);

exports.getGameInfo = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (request: any, response: any) => {

    const appID = request.body

    https.get(`https://store.steampowered.com/api/appdetails?appids=${appID}`, (res: any) => {
      let data: any[] = [];
      const headerDate = res.headers && res.headers.date ? res.headers.date : "no response date";
      console.log("Status Code:", res.statusCode);
      console.log("Date in Response header:", headerDate);

      res.on("data", (chunk: any) => {
        data.push(chunk);
      });

      res.on("end", () => {
        console.log("Response ended.");
        const result = JSON.parse(Buffer.concat(data).toString());
        response.send({ success: true, data: result })
      });

    }).on("error", (err: any) => {
      console.log("Error: ", err.message);
      response.send({ success: false, msg: "Сталася помилка при запиті"})
    });
  }
);

exports.addNewGame = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (req: any, res: any) => {
    
    const body: {
        name: string;
        gameUrl: string;
        imageUrl: string;
        id: string;
        created: number;
        appID: string;
      } = req.body;

    const snapshot = await getFirestore()
      .collection("dunderlist")
      .where("name", "==", body.name)
      .get();

    if (!snapshot.empty) {
      res.send({ success: false, msg: "Гра з такою назвою вже є в списку" })
      return;
    }  

    await getFirestore()
      .collection("dunderlist")
      .add({
        ...body, 
        reactions: {
          heart: 0,
          poop: 0
        },
      });

    res.send({ success: true, msg: "Гру додано у дундерсписок" })
  }
);

exports.moveToPlayedList = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (req: any, res: any) => {
    
    const body = req.body;

    const snapshot = await getFirestore()
      .collection("playedlist")
      .where("name", "==", body.name)
      .get();

    if (!snapshot.empty) {
      res.send({ success: false, msg: "Гра з такою назвою вже є в списку" })
      return;
    }  

    const snapshot2 = await getFirestore()
      .collection("dunderlist")
      .where("id", "==", body.id)
      .get();

    let gameToMove: { 
      name: string; 
      gameUrl: string;
      imageUrl: string;
      id: string;
      playedDate: number;
      appID: string;
    } = {
      name: "",
      gameUrl: "",
      imageUrl: "",
      id: "",
      playedDate: 0,
      appID: ""
    };

    if (snapshot2.empty) {
      res.send({ success: false, msg: "В базі немає гри з таким ID" })
      return;
    }  

    snapshot2.forEach((doc: any) => {
      gameToMove = {
        name: doc.data().name,
        gameUrl: doc.data().gameUrl,
        imageUrl: doc.data().imageUrl,
        id: Math.random().toString(),
        playedDate: body.playedDate,
        appID: doc.data().appID,
      }
      doc.ref.delete()
    });

    await getFirestore().collection("playedlist").add(gameToMove);

    res.send({ success: true, msg: "Гру перенесено до списку зіграних" })
  }
);

exports.removeDunderListGame = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (req: any, res: any) => {
    
    const body = req.body;
    const userQuery = await getFirestore()
      .collection("dunderlist")
      .where("id", "==", body)
      .get();

    userQuery.forEach((doc: any) => {
      doc.ref.delete()
    });

    res.send({ success: true, msg: "Гру видалено зі списку" })
  }
);

exports.removePlayedListGame = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (req: any, res: any) => {
    
    const body = req.body;
    const userQuery = await getFirestore()
      .collection("playedlist")
      .where("id", "==", body)
      .get();

    userQuery.forEach((doc: any) => {
      doc.ref.delete()
    });

    res.send({ success: true, msg: "Гру видалено зі списку" })
  }
);

exports.addReaction = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (req: any, res: any) => {
    
    const body = req.body;
    const userQuery = await getFirestore()
      .collection("dunderlist")
      .where("name", "==", body.gameName)
      .get();

    userQuery.forEach((doc: any) => {
      doc.ref.set({
        reactions: { 
          ...doc.data().reactions,
          [body.reactionName]: doc.data().reactions[body.reactionName] + 1
        }
      }, { merge: true })
    });

    res.send({ success: true,  msg: "Реакцію змінено" })
  }
);

exports.loadMorePlayedList = onRequest(
  { cors: [/firebase\.com$/, /web\.app$/, /localhost$/, /127.0.0.1$/] }, 
  async (req: any, res: any) => {
    
    const lastItemId = req.body;

    const last = await getFirestore().collection("playedlist").where("id", "==", lastItemId).get();
    const index = last.docs[0].data().playedDate;
    const limit: number = 10;

    const loadMoreBatch = await getFirestore().collection("playedlist").orderBy("playedDate", "desc").startAfter(index).limit(limit).get();

    let result: any[] = [];

    loadMoreBatch.forEach((doc: any) => {
      result.push(doc.data())
    });

    if(loadMoreBatch.docs.length < limit) {
      res.send({ success: true, data: { list: result, isLoadable: false }});
      return;
    }

    res.send({ success: true, data: { list: result, isLoadable: true }});
  }
);


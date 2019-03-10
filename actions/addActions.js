import firebase from "firebase";
import 'firebase/firestore';
import config from '../config/config';
import {ADDED_TO_STOCK, ITEM_ADDED, LOAD_ITEMS} from "./types";

// console.log("CONFIG: " + JSON.stringify(config));

if(!firebase.apps.length)
    firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

export const loadItems = () => {
    console.log("loadITEMS_ACTION");

    console.log(firebase.auth().currentUser);

    return async (dispatch) => {
        db.collection(`users/${firebase.auth().currentUser.uid}/items`).onSnapshot((query) => {
            let items = [];
            let data;

            query.forEach((doc) => {
                data = doc.data();
                data.key = doc.id;
                // console.log(data);
                items.push(data);
                dispatch({type: LOAD_ITEMS, payload: items});
                // console.log("Items Array: " + JSON.stringify(items));
            });
        });
    }
};


export const addToStock = (state) => {
  console.log("ADD_TO_STOCK_ACTION");
  console.log(state);

  return async (dispatch) => {
      state.list.map((obj) => {

          let ref = db.collection(`users/${firebase.auth().currentUser.uid}/stock`).doc(obj.id);

          db.runTransaction(function (transaction) {
              return transaction.get(ref).then(function (reqDoc) {
                  if(!reqDoc.exists){
                      db.collection(`users/${firebase.auth().currentUser.uid}/stock`).doc(obj.id).set(obj).then(() => {
                          console.log("ITEM added to stock!");
                      })
                  }else{
                      let newQuantity = parseInt(reqDoc.data().quantity) + parseInt(obj.quantity);
                      transaction.update(ref, {quantity: newQuantity});
                  }
              })    ;
          }).then(function () {
              console.log("ITEM UPDATED IN STOCK!");
          })
              .catch(function (err) {
                  console.log("TRANSACTION FAILED: " + err);
              });

      });
      dispatch({type: ADDED_TO_STOCK, payload: "success"});
  }
};
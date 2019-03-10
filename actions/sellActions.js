import firebase from "firebase";
import 'firebase/firestore';
import config from '../config/config';
import {REMOVED_FROM_STOCK} from "./types";

if(!firebase.apps.length)
    firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

export const removeFromStock = (state) => {
  console.log("REMOVE_STOCK_ACTION!");
  console.log(state);

  return async (dispatch) => {
      state.list.map((obj) => {
          let ref = db.collection(`users/${firebase.auth().currentUser.uid}/stock`).doc(obj.id);

          db.runTransaction(function (transaction) {
              return transaction.get(ref)
                  .then((reqdoc) => {
                      if(!reqdoc){
                          console.log("no such item in stock!!");
                      }else{
                          let newQuantity = parseInt(reqdoc.data().quantity) - parseInt(obj.quantity);
                          transaction.update(ref, {quantity: newQuantity});
                      }
                  });
          }).then(() => {
              console.log("ITEM UPDATED IN STOCK!!");
          })
      });
      dispatch({type: REMOVED_FROM_STOCK, payload: "success"});
  }
};
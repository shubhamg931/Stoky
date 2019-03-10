import {ITEM_REGISTERED} from "./types";
import firebase from "firebase";
import 'firebase/firestore';
import config from '../config/config';

// console.log("CONFIG: " + JSON.stringify(config));

if(!firebase.apps.length)
    firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

export const registerItem = (state) => {
    console.log("register the item in firebase database!");
    console.log(state);

    return async (dispatch) => {
        console.log("isnide async!");
        console.log("cureent user id:" + firebase.auth().currentUser.uid);
        db.collection(`users/${firebase.auth().currentUser.uid}/items`).doc().set(state).then(() => {
            console.log("Item added to database");
            dispatch({type: ITEM_REGISTERED, paylod: "added"});
        });
    }
};
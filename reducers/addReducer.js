import {ADDED_TO_STOCK, ITEM_ADDED, LOAD_ITEMS} from "../actions/types";

const INITIAL_STATE = {items: [], addToStockStatus: ''};

export default function (state=INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_ITEMS:
            return {...state, items: action.payload };
        case ADDED_TO_STOCK:
            return {...state, addToStockStatus: action.payload};
        default:
            return state;
    }
}
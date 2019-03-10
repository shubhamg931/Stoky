import {ITEM_REGISTERED} from "../actions/types";

const INITIAL_STATE = {status: 'hmmm'};

export default function (state=INITIAL_STATE, action) {
    switch (action.type) {
        case ITEM_REGISTERED:
            return {...state, status: action.payload};
        default:
            return state;
    }
}
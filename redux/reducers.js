import { SET_URL } from "./actions";

const initialState = {
    url: "http://20.125.139.137:8114/",
};

function urlReducer(state = initialState, action) {
    switch (action.type) {
        case SET_URL:
            return {
                ...state,
                url: action.payload,
            };
        default:
            return state;
    }
}

export default urlReducer;

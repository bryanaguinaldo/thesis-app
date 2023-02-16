export const SET_URL = "SET_URL";

export const setUrl = (url) => (dispatch) => {
    dispatch({
        type: SET_URL,
        payload: url,
    });
};

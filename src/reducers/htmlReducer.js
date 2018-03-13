
const reducer = (store = '', action) => {
    if (action.type === 'INITIALIZE') {
      store = action.html 
      return store
  }

  return store
}

export const initialize = (html) => {
  return async (dispatch) => {
    dispatch({
      type: 'INITIALIZE',
      html
    })
  }
}




export default reducer;

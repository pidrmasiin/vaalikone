const initialState= {
  kysymys: '',
  selitys: '',
  url: '',
  puolueet: []
}

const reducer = (store = initialState, action) => {
    if (action.type === 'ADD_PUOLUE') {
      return {...store, puolueet: action.puolueet}
    }if (action.type === 'ADD_DETAILS') {
      return {...store, kysymys: action.details.kysymys, selitys: action.details.selitys, url: action.details.url}
    }
    return store
  }
  
  export const addPuolueet = (puolueet) => {
    return async (dispatch) => {
      dispatch({
        type: 'ADD_PUOLUE',
        puolueet
      })
    }
  }

  export const addDetails = (details) => {
    return async (dispatch) => {
      dispatch({
        type: 'ADD_DETAILS',
        details
      })
    }
  }


  
  
  export default reducer;
  
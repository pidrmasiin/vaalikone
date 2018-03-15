const intialState = {
  puolueet: '',
  edustajat: ''
}

const reducer = (store = intialState, action) => {
    if (action.type === 'HTML_PUOLUEET') {
      return {...store, puolueet: action.html}
    }if (action.type === 'HTML_EDUSTAJAT') {
      return {...store, edustajat: action.html}
    }


  return store
}

export const htmlPuolueet = (html) => {
  return async (dispatch) => {
    dispatch({
      type: 'HTML_PUOLUEET',
      html
    })
  }
}

export const htmlEdustajat = (html) => {
  return async (dispatch) => {
    dispatch({
      type: 'HTML_EDUSTAJAT',
      html
    })
  }
}




export default reducer;

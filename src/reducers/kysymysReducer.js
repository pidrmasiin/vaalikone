const initialState= {
  kysymys: '',
  selitys: '',
  url: '',
  puolueet: [],
  edustajat:[],
  kategoriat:[],
  vuosi: ''
}

const kysymysReducer = (store = initialState, action) => {
    if (action.type === 'ADD_PUOLUE') {
      return {...store, puolueet: action.puolueet}
    }if (action.type === 'ADD_DETAILS') {
      return {...store, 
        kysymys: action.details.kysymys, 
        selitys: action.details.selitys, 
        url: action.details.url, 
        vuosi: action.details.vuosi}
    }if (action.type === 'ADD_EDUSTAJAT') {
      return {...store, edustajat: action.edustajat}
    }if(action.type === 'ADD_KATEGORIAT'){
      return {...store, kategoriat: action.kategoriat}
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
  
  export const addEdustajat = (edustajat) => {
    return async (dispatch) => {
      dispatch({
        type: 'ADD_EDUSTAJAT',
        edustajat
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

  export const addKategoriat = (kategoriat) => {
    return async (dispatch) => {
      dispatch({
        type: 'ADD_KATEGORIAT',
        kategoriat
      })
    }
  }


  
  
  export default kysymysReducer;
  
import kategoriatService from '../services/kategoria'

const kategoriatReducer = (store = [], action) => {
    if (action.type === 'GET_GATEGORIES') {
      return action.data
    }
    return store
}

export const getKategoriat = () => {
    return async (dispatch) => {
        const all = await kategoriatService.getAll()
      dispatch({
        type: 'GET_GATEGORIES',
        data: all
      })
    }
  }

export default kategoriatReducer
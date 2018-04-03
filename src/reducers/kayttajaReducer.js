const initialState = {
  kysymykset: [],
  puolueet: [
    { name: 'Sosialidemokraattinen eduskuntaryhmä', aanet: 0 },
    { name: 'Keskustan eduskuntaryhmä', aanet: 0},
    { name: 'Perussuomalaisten eduskuntaryhmä', aanet: 0 },
    { name: 'Kansallisen kokoomuksen eduskuntaryhmä', aanet: 0 },
    { name: 'Ruotsalainen eduskuntaryhmä', aanet: 0 },
    { name: 'Vihreä eduskuntaryhmä', aanet: 0 },
    { name: 'Kristillisdemokraattinen eduskuntaryhmä', aanet: 0},
    { name: 'Vasemmistoliiton eduskuntaryhmä', aanet: 0},
    { name: 'Sininen eduskuntaryhmä', aanet: 0 }
  ]
}

const kayttajaReducer = (store = initialState, action) => {
  const puolue = store.puolueet.filter(p => p.name === action.type)
  const filtered = store.puolueet.filter(p => p.name !== action.type)
  if(puolue.length > 0){
    puolue[0].aanet = puolue[0].aanet +1
    filtered.push(puolue[0])
  }
    
    if(action.type === 'VASTAUS'){
      const old = store.kysymykset.filter(k => k.id !== action.kysymys.id)
        old.push(action.kysymys)
        return {...store, kysymykset: old}
    }
    
    switch (action.type) {
      case 'Keskustan eduskuntaryhmä':
        return  {...store, puolueet: filtered}
      case 'Perussuomalaisten eduskuntaryhmä':
        return  {...store, puolueet: filtered}
      case 'Kansallisen kokoomuksen eduskuntaryhmä':
        return  {...store, puolueet: filtered}
      case 'Sosialidemokraattinen eduskuntaryhmä':
        return  {...store, puolueet: filtered}
      case 'Vihreä eduskuntaryhmä':
        return  {...store, puolueet: filtered}
      case 'Vasemmistoliiton eduskuntaryhmä':
        return  {...store, puolueet: filtered}
      case 'Sininen eduskuntaryhmä':
        return  {...store, puolueet: filtered}
      case 'Ruotsalainen eduskuntaryhmä':
        return  {...store, puolueet: filtered}
      case 'Kristillisdemokraattinen eduskuntaryhmä':
        return  {...store, puolueet: filtered} 
    }
    return store
  }
  
  export const addKysymys = (content) => {
    return async (dispatch) => {
      dispatch({
        type: 'VASTAUS',
        kysymys: content
      })
  }
}

  export const addVastaus= (content) => {
  return async (dispatch) => {
    dispatch({
      type: content
    })
}
}

  
  
  export default kayttajaReducer;
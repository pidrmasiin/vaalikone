import axios from 'axios'
const baseUrl = '/api/kysymykset'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('response', response.data)
  return response.data
  }

const addKysymys = async (newObject) => {
    const config = {
      headers: { 'Authorization': token }
    }
  
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
    return token
  }

export default { 
    getAll,
    setToken,
    addKysymys
  }
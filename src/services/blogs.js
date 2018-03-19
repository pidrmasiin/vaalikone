import axios from 'axios'
const baseUrl = '/api/kysymykset'

let token = null

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const add = async (newObject) => {
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
    add
  }
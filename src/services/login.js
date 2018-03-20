import axios from 'axios'
const baseUrl = '/api/login'

const login = async (user, pass) => {
  const response = await axios.post(baseUrl, user, pass)
  return response.data
}

export default { login }
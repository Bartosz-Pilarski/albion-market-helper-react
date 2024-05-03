import axios from 'axios'

const baseUrl = '/api/refining'

const getAllRecipes = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export default {
  getAllRecipes
}
import axios from 'axios'

const baseUrl = '/api/lastupdate'

const getLastUpdate = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export default {
  getLastUpdate
}
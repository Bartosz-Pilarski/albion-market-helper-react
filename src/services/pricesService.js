import axios from 'axios'

const baseUrl = '/api/resources'

const getAllPrices = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getPricesByType = async (type) => {
  const request = await axios.get(`${baseUrl}/${type}`)
  return request.data
}

const getPricesByTypeAndTier = async (type, tier) => {
  const request = await axios.get(`${baseUrl}/${type}/${tier}`)
  return request.data
}

export default {
  getAllPrices,
  getPricesByType,
  getPricesByTypeAndTier
}
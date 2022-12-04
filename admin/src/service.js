const axios = require("axios")
const config = require("config")

const getInvestmentById = async (id) => {
  const {data: userInvestment} = await axios.get(`${config.investmentsServiceUrl}/investments/${id}`)
  return userInvestment
}

module.exports = {
    getInvestmentById
}

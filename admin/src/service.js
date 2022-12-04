const axios = require("axios")
const config = require("config")

const getAllCompanies = async () => {
    const {data: companies} = await axios.get(`${config.financialCompaniesServiceUrl}/companies`)
    return companies
  }

const getInvestmentById = async (id) => {
  const {data: userInvestment} = await axios.get(`${config.investmentsServiceUrl}/investments/${id}`)
  return userInvestment
}

const getAllInvestments = async () => {
    const {data: investments} = await axios.get(`${config.investmentsServiceUrl}/investments`)
    return investments
  }


const postReportToExportRoute = async (csvReport) => {
  const json = JSON.stringify({ export: csvReport})
  console.log("Print JSON", json)
    axios.post(`${config.investmentsServiceUrl}/investments/export`, json, {
        headers: {
          "content-type": "application/json",
        },
      } )
}

module.exports = {
    getInvestmentById,
    getAllCompanies,
    getAllInvestments,
    postReportToExportRoute,
}

const config = require("config");
const { parse } = require("json2csv");

const getHoldingAccountNameById = (companies, holdingId) => {
  const company = companies.find((company) => company.id == holdingId);
  if (!company) throw new Error(`Not found: Company with ID ${holdingId}`)
  return company.name;
};

const createCSV = (allUserHoldings) => {
    try {
      const fields = [
        "User",
        "First Name",
        "Last Name",
        "Date",
        "Holding",
        "Value",
      ];
      const opts = { fields };
      const csvReport = parse(allUserHoldings, opts);
      return csvReport
    } catch (err) {
      console.error(err);
      throw "Error generating allUserHoldings report.";
    }
  }

  const calculateHoldingValue = (investmentTotal, investmentPercentage) => {
    if (!investmentTotal || !investmentPercentage) throw new Error("InvestmentTotal or investmentPercentage value not provided")
    const holdingValue = investmentTotal * investmentPercentage;
    return holdingValue;
  };
  

module.exports = {
  getHoldingAccountNameById, createCSV, calculateHoldingValue
};

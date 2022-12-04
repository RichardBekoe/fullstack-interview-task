const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const {
  getInvestmentById,
  getAllCompanies,
  getAllInvestments,
  postReportToExportRoute,
} = require("./service")
const { getHoldingAccountNameById, createCSV, calculateHoldingValue } = require("./helpers")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/admin/investments/:id", async (req, res) => {
  try {
    const {id} = req.params
    const userInvestment = await getInvestmentById(id)
    res.send(userInvestment)
  } catch (err) {
    console.error(err)
    res.send(500)
  }
})

app.post("/admin/users/report", async (req, res) => {
  try {
    const investments = await getAllInvestments();
    const companies = await getAllCompanies();

    const allUserHoldings = investments.reduce((holdingsArray, investment) => {
      investment.holdings.forEach((holding) => {
        holdingsArray.push({
          User: investment.userId,
          "First Name": investment.firstName,
          "Last Name": investment.lastName,
          Date: investment.date,
          Holding: getHoldingAccountNameById(companies, holding.id),
          Value: calculateHoldingValue(investment.investmentTotal, holding.investmentPercentage),
        });
      });
      return holdingsArray;
    }, []);

    const csvReport = createCSV(allUserHoldings);
    await postReportToExportRoute(csvReport);

    res.send("User holdings report created");
  } catch (err) {
    console.error(err);
    res.send(500);
  }
});

const server = app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})

module.exports = server
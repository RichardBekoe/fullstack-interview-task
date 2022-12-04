const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const {
  getInvestmentById
} = require("./service")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/admin/investments/:id", async (req, res) => {
  try {
    const {id} = req.params
    const investment = await getInvestmentById(id)
    res.send(investment)
  } catch (err) {
    console.error(err)
    res.send(500)
  }
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})

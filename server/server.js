const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
const BNR_URL = "https://www.bnro.ro/nbrfxrates.xml";

app.use(cors());
app.use(bodyParser.json());

let exchangeRates = [];
let transactions = [];

const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(BNR_URL);
    const parsedData = await xml2js.parseStringPromise(response.data, {explicitArray: false});
    const rates = parsedData.DataSet.Body.Cube.Rate;

    exchangeRates = rates.map(rate => ({
      currency: rate.$.currency,
      value: parseFloat(rate._) * (rate.$.multiplier ? parseInt(rate.$.multiplier) : 1)
    }));

    return exchangeRates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return [];
  }
};

app.get("/exchange-rates-bnr", async (req, res) => {
  exchangeRates = await fetchExchangeRates();
  res.json(exchangeRates);
});

app.get("/exchange-rates", (req, res) => {
  if (exchangeRates.length === 0) {
    return res.json([]);
  }
  res.json(exchangeRates);
});

app.post("/update-exchange-rates", (req, res) => {
  const {currency, value} = req.body;

  console.log('body: ', req.body);
  console.log('exchangeRates: ', exchangeRates);

  if (!currency || !value || isNaN(value) || value <= 0) {
    return res.status(400).json({error: "Invalid currency or value"});
  }

  const rate = exchangeRates.find(rate => rate.currency === currency);
  if (!rate) {
    return res.status(400).json({error: "Currency not found in exchange rates"});
  }

  rate.value = value;
  res.json(exchangeRates);
});

app.post("/add-transaction", (req, res) => {
  const {id, date, productCode, quantity, amount, currency, fee} = req.body;

  if (!id || !date || !productCode || !quantity || !amount || !currency || fee == null) {
    return res.status(400).json({error: "All fields are required"});
  }

  if (transactions.some(t => t.id === id)) {
    return res.status(400).json({error: "Transaction ID must be unique"});
  }

  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!dateRegex.test(date) || new Date(date.split('.').reverse().join('-')) > new Date()) {
    return res.status(400).json({error: "Invalid date format or future date"});
  }

  if (!/^[a-zA-Z0-9]{4}$/.test(productCode)) {
    return res.status(400).json({error: "Product code must be exactly 4 alphanumeric characters"});
  }

  if (isNaN(quantity) || quantity <= 0 || isNaN(amount) || amount <= 0 || isNaN(fee) || fee < 0 || fee > 100) {
    return res.status(400).json({error: "Invalid numerical values"});
  }

  if (!exchangeRates.some(rate => rate.currency === currency)) {
    return res.status(400).json({error: "Currency not found in exchange rates"});
  }

  transactions.push({id, date, productCode, quantity, amount, currency, fee});
  res.json({message: "Transaction added successfully", transactions});
});

app.get("/transactions-list", (req, res) => {
  res.json(transactions);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

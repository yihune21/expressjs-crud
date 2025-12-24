const express = require("express");
const cities = require("./cities");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.get("/health", (req, res) => {
  res.send("The server is running!");
});

app.get("/cities", (req, res) => {
  res.json(cities);
});

app.post("/city", (req, res) => {
  data = req.body;
  city = data["city"];
  if (!city) {
    return res.status(400).json("City is required");
  }

  isExist = cities.indexOf(city);
  console.log(isExist);

  if (isExist !== -1) {
    return res.status(400).json("City is already existed");
  }

  cities.push(city);

  res.json(cities);
});

app.post("/bulkCity", (req, res) => {
  data = req.body;
  citys = data["cities"];
  if (!citys) {
    return res.status(400).json("Citys is required");
  }

  citys.forEach((c) => {
    cities.push(c);
  });

  res.json(cities);
});

app.put("/city/:index", (req, res) => {
  const index = Number(req.params.index);
  const { city } = req.body;

  if (Number.isNaN(index)) {
    return res.status(400).json("Index must be a number");
  }

  if (index < 0 || index >= cities.length) {
    return res.status(404).json("Index out of range");
  }

  if (!city) {
    return res.status(400).json("City is required");
  }

  cities[index] = city;

  return res.json(cities);
});

app.delete("/city/:index", (req, res) => {
  const index = Number(req.params.index);

  if (Number.isNaN(index)) {
    return res.status(400).json("Index must be a number");
  }

  if (index < 0 || index >= cities.length) {
    return res.status(404).json("Index out of range");
  }

  const removedCity = cities.splice(index, 1);

  return res.json({
    removed: removedCity[0],
    cities,
  });

  return res.json(cities);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

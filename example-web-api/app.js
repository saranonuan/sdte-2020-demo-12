const prometheusMiddleware = require("express-prometheus-middleware");
const express = require("express");
const app = express();

app.use(prometheusMiddleware({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));

app.get("/api", (req, res) => {
  res.status(200).send("Api Works.");
});
app.get("/api/fast", (req, res) => {
  res.status(200).send("Fast response!");
});
app.get("/api/slow", (req, res) => {
  setTimeout(() => {
    res.status(200).send("Slow response...");
  }, 1000);
});

app.get("/api/error", (req, res, next) => {
  try {
    throw new Error("Something broke...");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/list/:listId", (req, res, next) => {
  res.status(200).send(`Retrieved list ${req.params.listId}`);
});

app.listen(4000, '0.0.0.0', () => {
  console.log("Server is running on port 4000");
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Timestamp API endpoint
app.get("/api/:date?", (req, res) => {
  let dateInput = req.params.date;

  let date;

  if (!dateInput) {
    date = new Date();
  } else if (!isNaN(dateInput)) {
    // Handle UNIX timestamp
    date = new Date(parseInt(dateInput));
  } else {
    // Handle date string
    date = new Date(dateInput);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

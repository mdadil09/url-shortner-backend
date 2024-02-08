const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const bodyParser = require("body-parser");
const ulrRoutes = require("./routes/urlShort");
const UrlData = require("./Models/urlModel");
const authRoutes = require("./routes/user");
const cors = require("cors");
const path = require("path");

const app = express();
dotenv.config();
app.use(cors());

//PORT
const PORT = process.env.PORT || 5701;

// middlewares
app.use(bodyParser.json());
app.use("/api/urlShortner", ulrRoutes);
app.use("/api/auth", authRoutes);

//dynamic routes

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await UrlData.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

//Database Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

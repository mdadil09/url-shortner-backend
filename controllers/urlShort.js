const { nanoid } = require("nanoid");
const UrlData = require("../Models/urlModel");

const generateURL = async (req, res) => {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = nanoid(8);

    await UrlData.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user.id,
    });

    return res.status(200).json({ id: shortID });
  } catch (error) {
    console.log(error);
  }
};

const getAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await UrlData.findOne({ shortId });
    return res.status(200).json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUrl = async (req, res) => {
  try {
    const result = await UrlData.find({ createdBy: req.user.id });

    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const updateUrl = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UrlData.updateOne(
      { _id: id },
      {
        $set: {
          redirectURL: req.body.url,
        },
      },
      { new: true }
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const deleteUrl = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UrlData.deleteOne({
      _id: id,
    });

    res.status(200).send("Deleted Successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generateURL,
  getAnalytics,
  getUrl,
  updateUrl,
  deleteUrl,
};

const Document = require("../document");
const express = require("express");
const router = express.Router();

// Get User by ID;
router.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    const documentData = await Document.findOne({ _id: id });
    // console.log(documentData);
    if (documentData) {
      //console.log(userDocument);
      res.status(200).json(documentData);
    } else {
      res.status(404).json({ message: "Nothing Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

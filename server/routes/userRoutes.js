const Document = require("../document");
const express = require("express");
const router = express.Router();

// Get User by ID;
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    const userDocument = await Document.where({
      creator: email,
    });
    if (userDocument) {
      //console.log(userDocument);
      res.status(200).json(userDocument);
    } else {
      res.status(404).json({ message: "Nothing Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

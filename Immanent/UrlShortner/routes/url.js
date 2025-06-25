const express = require("express");
const router = express.Router();
const {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirectShortURL
} = require("../controllers/url")

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics); 
router.get("/:shortId", handleRedirectShortURL);


module.exports = router
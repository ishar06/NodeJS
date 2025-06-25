const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if (!body.url){
        return res.status(400).json({error: "URL is required"})
    }
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.json({id : shortID});
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({ totalClick:result.visitHistory.length, 
                      analytics: result.visitHistory
                    })
}

async function handleRedirectShortURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirectShortURL,
}
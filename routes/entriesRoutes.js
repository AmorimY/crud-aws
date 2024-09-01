const DiaryEntrie = require("../models/DiaryEntrie");

const router = require("express").Router();

router.get("/", async (req, res) => {
    return res.status(200).json({ msg: "olá" });
});

router.post("/", async (req, res) => {
    let newEntrie = new DiaryEntrie({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
    });

    newEntrie.save().then((result) => {
        res.status(200).json({
            result,
        });
    });
});

router.get("/:userId", async (req, res) => {
    let userId = req.params.userId;
    let entries = DiaryEntrie;
    entries.find({ userId: userId }, "-userId -__v" ).then((entries) => {
        res.status(200).json({
            entries
        });
    });
});

module.exports = router;

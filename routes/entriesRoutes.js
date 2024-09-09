const DiaryEntrie = require("../models/DiaryEntrie");
const mongoose = require('mongoose')


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
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    let entries = DiaryEntrie;
    entries.find({ userId: userId }, "-userId -__v" ).then((entries) => {
        res.status(200).json({
            entries
        });
    });
});

router.delete("/:id", async(req, res) => {{
    let id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    try {
        const result = await DiaryEntrie.findByIdAndDelete({_id:id})
        const isDeleted = result.$isDeleted()
        res.status(200).json({message: result, IsDeleted: isDeleted})
        
    } catch (error) {
        res.status(400).json({error: error})
    }
    
}})

module.exports = router;

const mongoose = require("mongoose");

const DiaryEntrie = mongoose.model("DiaryEntrie", {
  userId: String,
  title: String,
  content: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports =  DiaryEntrie
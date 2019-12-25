const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  name: String,
  location: String,
  date: String,
  author: String,
});

// entrySchema.statics.mostRecent = async function() {
//   return this.find()
//     .sort('createdAt')
//     .limit(5)
//     .exec();
// };

module.exports = mongoose.model('Party', partySchema);

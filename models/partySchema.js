const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: String,
});

// entrySchema.statics.mostRecent = async function() {
//   return this.find()
//     .sort('createdAt')
//     .limit(5)
//     .exec();
// };

module.exports = mongoose.model('Post', partySchema);

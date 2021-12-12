const { Schema, model} = require("mongoose");

const mongoose = require("mongoose"); 

const AnnouncementSchema =  new Schema ( {
  name: {
    type: String,
  },
  sale: {
    type: Boolean,
  }, 
  price: {
    type: Number,
  }, 
  photo: {
    type: String,
  },
  tags: [String], 
  
}); 

AnnouncementSchema.statics.list = function(filtro, limit, select, sort, skip) {
  const query = Announcement.find(filtro); 
  query.limit(limit); 
  query.select(select); 
  query.sort(sort); 
  query.skip(skip);
  return query.exec(); 

}

const Announcement = mongoose.model('Announcement', AnnouncementSchema); 
module.exports = model ( "Announcement", AnnouncementSchema); 
module.exports = Announcement; 
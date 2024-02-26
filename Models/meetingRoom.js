// meetingRoom.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingRoomSchema = new Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  amenities: [String], // Liste des équipements disponibles dans la salle de réunion
  location: { type: String, required: true }, // Emplacement de la salle de réunion
  floor: { type: Number, required: true }, // Étage où se trouve la salle de réunion
  description: { type: String } // Description de la salle de réunion
// Autres détails de la salle de réunion
  ,available: { type: Boolean, default: true }
});

module.exports = mongoose.model('MeetingRoom', meetingRoomSchema);

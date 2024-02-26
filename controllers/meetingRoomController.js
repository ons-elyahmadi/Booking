const MeetingRoom = require('../Models/meetingRoom');

// Contrôleur pour créer une nouvelle salle de réunion
exports.createMeetingRoom = async (req, res) => {
  try {
    const { name, capacity, amenities, location, floor, description } = req.body;
    const newMeetingRoom = await MeetingRoom.create({ name, capacity, amenities, location, floor, description });
    res.status(201).json(newMeetingRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Contrôleur pour récupérer toutes les salles de réunion
exports.getAllMeetingRooms = async (req, res) => {
  try {
    const meetingRooms = await MeetingRoom.find();
    res.json(meetingRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour récupérer une salle de réunion par ID
exports.getMeetingRoomById = async (req, res) => {
  try {
    const meetingRoom = await MeetingRoom.findById(req.params.id);
    if (!meetingRoom) {
      return res.status(404).json({ message: 'Salle de réunion non trouvée.' });
    }
    res.json(meetingRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour mettre à jour une salle de réunion
exports.updateMeetingRoom = async (req, res) => {
  try {
    const { name, capacity, amenities, location, floor, description } = req.body;
    const updatedMeetingRoom = await MeetingRoom.findByIdAndUpdate(req.params.id, 
      { name, capacity, amenities, location, floor, description }, { new: true });
    if (!updatedMeetingRoom) {
      return res.status(404).json({ message: 'Salle de réunion non trouvée.' });
    }
    res.json(updatedMeetingRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour supprimer une salle de réunion
exports.deleteMeetingRoom = async (req, res) => {
  try {
    const deletedMeetingRoom = await MeetingRoom.findByIdAndDelete(req.params.id);
    if (!deletedMeetingRoom) {
      return res.status(404).json({ message: 'Salle de réunion non trouvée.' });
    }
    res.json({ message: 'La salle de réunion a été supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAvailableMeetingRooms = async (req, res) => {
  try {
    // Logique pour récupérer les salles de réunion disponibles depuis votre base de données
    const availableRooms = await MeetingRoom.find({ available: true });
    res.json(availableRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

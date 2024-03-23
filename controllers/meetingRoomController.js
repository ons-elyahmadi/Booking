const MeetingRoom = require('../Models/meetingRoom');

// Contrôleur pour créer une nouvelle salle de réunion
exports.createMeetingRoom = async (req, res) => {
  try {
    const { name, capacity, amenities, location, floor, description } = req.body;
    
    const newMeetingRoom = await MeetingRoom.create({ name, capacity, amenities, location, floor, description });
    const availableRooms = await MeetingRoom.find({ available: true });
  
    res.render("meetingRoom",{availableRooms:availableRooms})
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
     
    res.render("updateRoomMeeting",{meetingRoom:meetingRoom})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour mettre à jour une salle de réunion
exports.updateMeetingRoom = async (req, res) => {
  try {
      const meetingRoomId = req.params.id;
      const { name, capacity, amenities, location, floor, description } = req.body;

      // Vérifiez s'il y a des données d'entrée valides pour la mise à jour
      if (!name && !capacity && !amenities && !location && !floor && !description) {
          return res.status(400).send("Veuillez fournir des données valides pour la mise à jour de la salle de réunion.");
      }

      // Recherchez la salle de réunion dans la base de données
      const  meetingRoom = await MeetingRoom.findByIdAndUpdate(meetingRoomId);

      // Vérifiez si la salle de réunion est trouvée dans la base de données
      if (!meetingRoom) {
          return res.status(404).send('Salle de réunion non trouvée.');
      }

      // Mettez à jour les champs de la salle de réunion si de nouvelles valeurs sont fournies
      if (name) {
          meetingRoom.name = name;
      }
      if (capacity) {
          meetingRoom.capacity = capacity;
      }
      if (amenities) {
          meetingRoom.amenities = amenities;
      }
      if (location) {
          meetingRoom.location = location;
      }
      if (floor) {
          meetingRoom.floor = floor;
      }
      if (description) {
          meetingRoom.description = description;
      }

      // Sauvegardez les modifications dans la base de données
      await meetingRoom.save();
       
      const availableRooms = await MeetingRoom.find({ available: true });
  
      res.render("meetingRoom",{availableRooms:availableRooms})
  } catch (error) {
      res.status(500).send(error.message);
  }
};


// Contrôleur pour supprimer une salle de réunion
exports.deleteMeetingRoom = async (req, res) => {
  try {
    const deletedMeetingRoom = await MeetingRoom.findByIdAndDelete(req.params.id);
    if (!deletedMeetingRoom) {
      return res.status(404).json({ message: 'Salle de réunion non trouvée.' });
    }
    const availableRooms = await MeetingRoom.find({ available: true });
  
    res.render("meetingRoom",{availableRooms:availableRooms})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAvailableMeetingRooms = async (req, res) => {
  try {
    // Logique pour récupérer les salles de réunion disponibles depuis votre base de données
    const availableRooms = await MeetingRoom.find({ available: true });
  
    res.render("meetingRoom",{availableRooms:availableRooms})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

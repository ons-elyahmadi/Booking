const Booking = require('../Models/booking');

exports.checkConflict = async (req, res, next) => {
  try {
    const { room, startTime, endTime } = req.body;
    // Vérifier si la salle est disponible pour la plage horaire spécifiée
    const existingBooking = await Booking.findOne({
      room,
      $or: [
        { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
        { startTime: { $lte: endTime }, endTime: { $gte: endTime } },
      ],
    });
    if (existingBooking) {
      throw new Error('La salle est déjà réservée pour cette plage horaire');
    }
    // Si aucune réservation n'existe pour cette plage horaire, passer au middleware suivant
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

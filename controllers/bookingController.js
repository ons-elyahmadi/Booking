const Booking = require('../Models/booking');
const socket = require('socket.io');
const MeetingRoom = require('../Models/meetingRoom');
const mongoose = require('mongoose');
exports.reserveRoom = async (req, res) => {
  try {
    const { user, room, startTime, endTime } = req.body;
     
     
    // Créer une nouvelle réservation
    const newBooking = await Booking.create({ user, room, startTime, endTime });
    // Lorsqu'une réservation est créée
    //const booking = await Booking.findById({ _id:newBooking._id });
    //await MeetingRoom.findByIdAndUpdate(booking.room, { available: false });
    //socket.emit('bookingCreated', { _id: room._id });
     // Vérifier que l'ID de la salle de réunion est correct
     const rmId = new mongoose.Types.ObjectId(room);
    const updatedRoom = await MeetingRoom.findByIdAndUpdate(rmId,{available: false });
    console.log("Room ID:", rmId); 
    console.log("Updated Room:", updatedRoom); // Vérifier la salle de réunion mise à jour


    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    // Récupérer toutes les réservations
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Méthode pour modifier une réservation existante
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, room } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(id, { startTime, endTime, room }, { new: true });
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Méthode pour annuler une réservation existante
exports.cancelBooking = async (req, res) => {
  try {
     
    const { id } = req.params;
    const booking = await Booking.findById(id);
    await Booking.findByIdAndDelete(id);
    // Lorsqu'une réservation est annulée
     
    await MeetingRoom.findByIdAndUpdate(booking.room , { available : true });
    //socket.emit('bookingCancelled', { _id: room._id });
     
    res.json({ message: 'Réservation annulée avec succès' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Méthode pour consulter les réservations d'un utilisateur spécifique
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const userBookings = await Booking.find({ user: userId });
    res.json(userBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Méthode pour consulter les réservations pour une salle de réunion spécifique
exports.getRoomBookings = async (req, res) => {
  try {
    const { roomId } = req.params;
    const roomBookings = await Booking.find({ room: roomId });
    res.json(roomBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
 

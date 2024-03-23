const Booking = require('../Models/booking');
const socket = require('socket.io');
const MeetingRoom = require('../Models/meetingRoom');
const User = require('../Models/User');
const mongoose = require('mongoose');
const  S = require('./sendEmailNotification')
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
    const usr = new mongoose.Types.ObjectId(user);
    const usrr = await User.findById(usr); 
    await  S.sendEmailNotification(usrr ,updatedRoom, 'booking');

    const bookings = await Booking.find();
    
    res.render("booking",{bookings:bookings })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    // Récupérer toutes les réservations
    const bookings = await Booking.find();
    
    res.render("booking",{bookings:bookings })
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
    const roomm = new mongoose.Types.ObjectId(updatedBooking.room);
    const updatedRoom = await MeetingRoom.findById(roomm); 
    const usr = new mongoose.Types.ObjectId(updatedBooking.user);
    const usrr = await User.findById(usr); 
    await S.sendEmailNotification(usrr ,updatedRoom, 'update'); 
    const bookings = await Booking.find();
    
    res.render("booking",{bookings:bookings })
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
     
    const updatedRoom = await MeetingRoom.findByIdAndUpdate(booking.room , { available : true });
    //socket.emit('bookingCancelled', { _id: room._id });
    const usr = new mongoose.Types.ObjectId(booking.user);
    const usrr = await User.findById(usr); 
    await S.sendEmailNotification(usrr ,updatedRoom, 'cancellation'); 
    const bookings = await Booking.find();
    
    res.render("booking",{bookings:bookings })
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
// Méthode pour obtenir une réservation par son ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    
    res.render("updateBooking",{booking:booking})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    const events = bookings.map(booking => ({
      title: 'Réservation',
      start: booking.startTime,
      end: booking.endTime
    }));
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
 

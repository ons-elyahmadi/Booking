const MeetingRoom = require('./Models/meetingRoom');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // Écouter l'événement de création de réservation
    socket.on('bookingCreated', async (roomId) => {
      try {
        const room = await MeetingRoom.findById(roomId);
        if (room) {
          room.available = false;
          await room.save();
          io.emit('roomAvailabilityChanged', { roomId, available: false });
        }
      } catch (error) {
        console.log(error);
      }
    });

    // Écouter l'événement d'annulation de réservation
    socket.on('bookingCancelled', async (roomId) => {
      try {
        const room = await MeetingRoom.findById(roomId);
        if (room) {
          room.available = true;
          await room.save();
          io.emit('roomAvailabilityChanged', { roomId, available: true });
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
};

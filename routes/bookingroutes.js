// booking.routes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const chekMiddleware = require('../middleware/conflictmiddleware');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Endpoints to manage bookings
 */

/**
 * @swagger
 * /api/bookings/:
 *   post:
 *     summary: Reserve a room
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               room:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '201':
 *         description: Room reserved successfully
 *       '400':
 *         description: Error reserving room
 */
router.post('/', authMiddleware.authenticateToken, chekMiddleware.checkConflict, bookingController.reserveRoom);

/**
 * @swagger
 * /api/bookings/:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful retrieval of bookings
 *       '500':
 *         description: Error retrieving bookings
 */
router.get('/', authMiddleware.authenticateToken, bookingController.getBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the booking to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               room:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '200':
 *         description: Booking updated successfully
 *       '404':
 *         description: Booking not found
 */
router.put('/:id', authMiddleware.authenticateToken, chekMiddleware.checkConflict, bookingController.updateBooking);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the booking to cancel
 *     responses:
 *       '200':
 *         description: Booking canceled successfully
 *       '404':
 *         description: Booking not found
 */
router.delete('/:id', authMiddleware.authenticateToken, bookingController.cancelBooking);

/**
 * @swagger
 * /api/bookings/user/{userId}:
 *   get:
 *     summary: Get all bookings for a specific user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       '200':
 *         description: Successful retrieval of user's bookings
 *       '404':
 *         description: User not found or no bookings found for the user
 */
router.get('/user/:userId', authMiddleware.authenticateToken, bookingController.getUserBookings);

/**
 * @swagger
 * /api/bookings/room/{roomId}:
 *   get:
 *     summary: Get all bookings for a specific room
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the room
 *     responses:
 *       '200':
 *         description: Successful retrieval of room's bookings
 *       '404':
 *         description: Room not found or no bookings found for the room
 */
router.get('/room/:roomId', authMiddleware.authenticateToken, bookingController.getRoomBookings);

module.exports = router;

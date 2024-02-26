const express = require('express');
const router = express.Router();
const meetingRoomController = require('../controllers/meetingRoomController');
const authMiddleware = require('../middleware/authMiddleware');


/**
 * @swagger
 * tags:
 *   name: Meeting Rooms
 *   description: Endpoints to manage meeting rooms
 */

/**
 * @swagger
 * /api/roomMeeting/:
 *   post:
 *     summary: Create a new meeting room
 *     tags: [Meeting Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the meeting room.
 *               capacity:
 *                 type: number
 *                 description: The capacity of the meeting room.
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of amenities available in the meeting room.
 *               location:
 *                 type: string
 *                 description: The location of the meeting room.
 *               floor:
 *                 type: number
 *                 description: The floor where the meeting room is located.
 *               description:
 *                 type: string
 *                 description: Description of the meeting room.
 *             required:
 *               - name
 *               - capacity
 *               - location
 *               - floor
 *     responses:
 *       '201':
 *         description: Meeting room created successfully
 *       '400':
 *         description: Error creating meeting room
 */
router.post('/', authMiddleware.authenticateToken, meetingRoomController.createMeetingRoom);

/**
 * @swagger
 * /api/roomMeeting/:
 *   get:
 *     summary: Get all meeting rooms
 *     tags: [Meeting Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful retrieval of meeting rooms
 *       '500':
 *         description: Error retrieving meeting rooms
 */
router.get('/',  authMiddleware.authenticateToken, meetingRoomController.getAvailableMeetingRooms);

/**
 * @swagger
 * /api/roomMeeting/{id}:
 *   get:
 *     summary: Get a specific meeting room by ID
 *     tags: [Meeting Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meeting room to retrieve
 *     responses:
 *       '200':
 *         description: Successful retrieval of the meeting room
 *       '404':
 *         description: Meeting room not found
 */
router.get('/:id',authMiddleware.authenticateToken, meetingRoomController.getMeetingRoomById);

/**
 * @swagger
 * /api/roomMeeting/{id}:
 *   put:
 *     summary: Update a meeting room
 *     tags: [Meeting Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meeting room to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: number
 *             required:
 *               - name
 *               - capacity
 *     responses:
 *       '200':
 *         description: Meeting room updated successfully
 *       '404':
 *         description: Meeting room not found
 */
router.put('/:id', authMiddleware.authenticateToken, meetingRoomController.updateMeetingRoom);

/**
 * @swagger
 * /api/roomMeeting/{id}:
 *   delete:
 *     summary: Delete a meeting room
 *     tags: [Meeting Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meeting room to delete
 *     responses:
 *       '200':
 *         description: Meeting room deleted successfully
 *       '404':
 *         description: Meeting room not found
 */
router.delete('/:id', authMiddleware.authenticateToken, meetingRoomController.deleteMeetingRoom);
/**
 * @swagger
 * /api/roomMeeting/available:
 *   get:
 *     summary: Get all available meeting rooms
 *     tags: [Meeting Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful retrieval of available meeting rooms
 *       '500':
 *         description: Error retrieving available meeting rooms
 */
router.get('/available', authMiddleware.authenticateToken, meetingRoomController.getAvailableMeetingRooms);


module.exports = router;

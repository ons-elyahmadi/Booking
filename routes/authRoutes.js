const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints pour l'authentification des utilisateurs
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Utilisateur inscrit avec succès
 *       '400':
 *         description: Erreur lors de l'inscription de l'utilisateur
 */

router.post('/signup', authController.signup);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur existant
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Connexion réussie, retourne le token JWT
 *       '401':
 *         description: Identifiants invalides, échec de la connexion
 */
router.post('/login', authController.login);
// Ajouter une route pour la déconnexion
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Déconnexion réussie
 *       '401':
 *         description: Non autorisé, veuillez vous connecter d'abord
 */
router.post('/logout', authMiddleware.authenticateToken, authController.logout);

module.exports = router;

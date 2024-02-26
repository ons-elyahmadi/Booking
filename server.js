const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const BookingRoutes =require('./routes/bookingroutes')
const meetingRoomRoutes =require('./routes/meetingRoomRoutes')
//const bookingRoutes = require('./routes/bookingRoutes');const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
dotenv.config()
const app = express();
 

// Swagger configuration
 
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meeting Room Reservation API',
      version: '1.0.0',
      description: 'API pour la réservation de salles de réunion',
      contact: {
        name: 'Amazing Developer'
      }
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Serveur de développement'
      }
    ],
    security: [
      {
        bearerAuth: [] // Utilisation de l'authentification Bearer
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Enter your JWT token'
        }
      }
    }
  },
  apis: ['./routes/*.js'] // Spécifiez le chemin vers vos fichiers de route
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

 
 
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(bodyParser.json());
 //db.js

 

// Remplacez `Connection String` par la chaîne de connexion MongoDB fournie
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to MongoDb');
     
}).catch((err) =>{
    console.error('Error connecting to mongodb:',err.message)
})
// Routes
app.use('/api/auth', authRoutes);
//app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/roomMeeting', meetingRoomRoutes);
app.use('/api/bookings', BookingRoutes );

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

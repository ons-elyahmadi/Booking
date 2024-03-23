const nodemailer = require('nodemailer');

// Configurer le transporteur SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onsyahmadi481@gmail.com', // Votre adresse e-mail Gmail
    pass: 'utlg iwjw fbfv bixe' // Votre mot de passe Gmail
  }
});

exports.sendEmailNotification = async (bookingDetails , romm , action) => {
  try {
    // Configurer les options de l'email en fonction de l'action
    let mailOptions;
    if (action === 'booking') {
      mailOptions = {
        from: 'onsyahmadi481@gmail.com', // Votre adresse e-mail Gmail
        to: bookingDetails.email,
        subject: 'Confirmation de réservation',
        text: `Votre réservation pour la salle ${romm.name} a été confirmée.`
      };
    } else if (action === 'cancellation') {
      mailOptions = {
        from: 'onsyahmadi481@gmail.com', // Votre adresse e-mail Gmail
        to: bookingDetails.email,
        subject: 'Annulation de réservation',
        text: `Votre réservation pour la salle ${romm.name} a été annulée.`
      };
    } else if (action === 'update') {
      mailOptions = {
        from: 'onsyahmadi481@gmail.com', // Votre adresse e-mail Gmail
        to: bookingDetails.email,
        subject: 'Modification de réservation',
        text: `Votre réservation pour la salle ${romm.name} a été modifier avec sucess.`
      };
    }

    // Envoyer l'e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès :', info.response);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
  }
};
